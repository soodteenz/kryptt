"""
Project: Kryptt
Author: Jon
Social Media:
- Twitter: @jondoescoding
Date: January 2024
"""

from fastapi import HTTPException
from app.core.logging import logging
from app.api.v1.settings import api_keys_store
from typing import List, Callable, Optional
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain_core.tools import BaseTool
from pydantic import BaseModel, ConfigDict

class AgentConfig(BaseModel):
    """Configuration for agent setup."""
    model_config = ConfigDict(arbitrary_types_allowed=True)
    
    agent_name: str
    tools: List[BaseTool]
    system_prompt: str
    model: str = "gpt-4o"
    temperature: float = 0.1
    max_retries: int = 2

def setup_base_agent(
    agent_name: str,
    tools: List[BaseTool],
    system_prompt: str,
    model: str = "gpt-4o",
    temperature: float = 0.1,
    max_retries: int = 2
) -> any:
    """
    Sets up and returns an agent with proper error handling.
    
    Args:
        agent_name: Name of the agent being created
        tools: List of tools the agent can use
        system_prompt: The system prompt that defines agent's behavior
        model: The LLM model to use
        temperature: Model temperature (0-1)
        max_retries: Maximum number of retries for API calls
        
    Returns:
        The configured agent
        
    Raises:
        HTTPException: If API keys are not configured or other setup errors occur
    """
    logging.info_with_emoji(f"🤖 Setting up {agent_name}...")
    
    try:
        # Create config
        config = AgentConfig(
            agent_name=agent_name,
            tools=tools,
            system_prompt=system_prompt,
            model=model,
            temperature=temperature,
            max_retries=max_retries
        )
        
        # Validate API keys
        if "current" not in api_keys_store:
            logging.error_with_emoji("🔑 API keys not found in store")
            raise HTTPException(
                status_code=404,
                detail="API keys not configured"
            )
            
        keys = api_keys_store["current"]
        logging.info_with_emoji("🔑 API keys retrieved successfully")
        
        # Initialize LLM
        logging.info_with_emoji("🧠 Initializing ChatOpenAI model...")
        llm = ChatOpenAI(
            model=config.model,
            api_key=keys["groq"],
            temperature=config.temperature,
            max_tokens=None,
            timeout=None,
            max_retries=config.max_retries,
        )
        
        # Create agent
        logging.info_with_emoji(f"🛠️ Creating {config.agent_name}...")
        agent = create_react_agent(
            model=llm,
            tools=config.tools,
            name=config.agent_name,
            prompt=config.system_prompt
        )
        
        logging.info_with_emoji(f"✅ {config.agent_name} setup completed successfully")
        return agent
        
    except HTTPException as he:
        logging.error_with_emoji(f"❌ HTTP Exception during agent setup: {str(he)}")
        raise he
    except Exception as e:
        logging.error_with_emoji(f"❌ Unexpected error during agent setup: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to setup {agent_name}: {str(e)}"
        )

