"""
Project: Kryptt
Author: Jon
Social Media:
- Twitter: @jondoescoding
Date: January 2024
"""
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.api.v1.tools.orders import quick_crypto_order, create_new_order

from typing import AsyncGenerator, Optional
from pydantic import BaseModel, Field
from langchain_core.messages import HumanMessage, AIMessage
from app.core.logging import logging
from app.core.init_agent import setup_base_agent
from app.core.memory import memory_store
import json
import time

router = APIRouter(prefix="/agents/order-agent", tags=["agents"])

class ChatRequest(BaseModel):
    """Request model for chat endpoint."""
    message: str = Field(
        ...,
        description="The message to send to the agent",
        example="Buy 0.1 ETH"
    )

class ChatResponse(BaseModel):
    """Response model for chat endpoint."""
    role: str = Field("assistant", description="The role of the message sender")
    content: str = Field(..., description="The message content")

# Global variable to store the agent instance
_order_agent: Optional[object] = None

def setup_order_agent():
    """
    Sets up and returns the order agent using the base agent setup.
    
    Returns:
        The configured order agent
        
    Raises:
        HTTPException: If API keys are not configured or other setup errors occur
    """
    return setup_base_agent(
        agent_name="Alpaca-Trading-Order-Agent-Trading-Bot",
        tools=[quick_crypto_order, create_new_order],
        system_prompt="""You are a trading bot specialized in executing crypto orders. You can handle both simple and complex orders.

For simple orders like "Buy 0.1 ETH", use the quick_crypto_order tool.
For complex orders (limit, stop, etc.), use the create_new_order tool.

Always confirm the order details before execution and provide clear feedback about the order status.
If there are any errors, explain them clearly to the user."""
    )

def get_agent():
    """
    Get or create the order agent instance.
    
    Returns:
        The order agent instance
        
    Raises:
        HTTPException: If agent setup fails
    """
    global _order_agent
    logging.info_with_emoji("🤖 Getting order agent instance...")
    if _order_agent is None:
        logging.info_with_emoji("🆕 Creating new order agent instance...")
        _order_agent = setup_order_agent()
    return _order_agent

async def stream_agent_response(message: str) -> AsyncGenerator[str, None]:
    """Stream the agent's response."""
    start_time = time.time()
    agent_id = "order-agent"  # Unique identifier for order agent
    logging.info_with_emoji(f"📝 Processing order request: {message}")
    
    try:
        # Get or initialize agent
        agent = get_agent()
        
        # Add user message to memory
        human_message = HumanMessage(content=message)
        memory_store.add_message(agent_id, human_message)
        
        # Create agent state with full message history
        agent_state = {
            "messages": memory_store.get_messages(agent_id),
            "structured_response": None
        }
        
        # Initialize agent with message
        logging.info_with_emoji("🤖 Invoking order agent...")
        agent_response = await agent.ainvoke(agent_state)
        
        # Extract the last message from the response
        if agent_response.get("messages"):
            last_message = agent_response["messages"][-1]
            content = last_message.content if isinstance(last_message, AIMessage) else str(last_message)
            # Add AI response to memory
            memory_store.add_message(agent_id, AIMessage(content=content))
        else:
            content = str(agent_response.get("structured_response", "No response generated"))
            memory_store.add_message(agent_id, AIMessage(content=content))
            
        # Check if the response indicates an error
        if any(error_phrase in content.lower() for error_phrase in ["error", "failed", "couldn't", "invalid", "not configured"]):
            logging.error_with_emoji(f"❌ Order failed: {content}")
            processing_time = time.time() - start_time
            logging.info_with_emoji(f"⚠️ Order processing failed in {processing_time:.2f} seconds")
        else:
            processing_time = time.time() - start_time
            logging.info_with_emoji(f"✅ Order processed successfully in {processing_time:.2f} seconds")
        
        # Stream the response
        response_chunk = ChatResponse(
            role="assistant",
            content=content
        )
        
        yield json.dumps(response_chunk.model_dump()) + "\n"
        
    except Exception as e:
        error_msg = f"Failed to process order: {str(e)}"
        logging.error_with_emoji(f"❌ {error_msg}")
        error_chunk = ChatResponse(
            role="assistant",
            content=error_msg
        )
        yield json.dumps(error_chunk.model_dump()) + "\n"

@router.post("/chat", 
    description="""
    Chat with the order agent to place crypto trades.
    
    Example queries:
    - "Buy 0.1 ETH"
    - "Sell 0.05 BTC"
    - "Place a limit order to buy 0.2 ETH at $2000"
    - "Set a stop loss order for 0.1 BTC at $40000"
    """
)
async def chat_with_agent(request: ChatRequest):
    """
    Chat endpoint that streams responses from the order agent.
    
    Args:
        request: ChatRequest containing the user's order request
        
    Returns:
        StreamingResponse: Streamed agent responses
    """
    logging.info_with_emoji(f"📨 Received order request: {request.message}")
    return StreamingResponse(
        stream_agent_response(request.message),
        media_type="text/event-stream"
    )