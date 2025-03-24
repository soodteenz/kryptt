"""
Project: Kryptt
Author: Jon
Social Media:
- Twitter: @jondoescoding
Date: January 2024
"""

from typing import Dict, List
from langchain_core.messages import BaseMessage
from pydantic import BaseModel
from app.core.logging import logging

class ConversationMemory(BaseModel):
    """Stores conversation history and summary for an agent."""
    messages: List[BaseMessage] = []
    summary: str = ""
    max_messages: int = 10  # Keep last N messages

class GlobalMemoryStore:
    """Global memory store for all agents."""
    _instance = None
    _memories: Dict[str, ConversationMemory] = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(GlobalMemoryStore, cls).__new__(cls)
        return cls._instance

    def get_memory(self, agent_id: str) -> ConversationMemory:
        """Get or create memory for an agent."""
        if agent_id not in self._memories:
            logging.info_with_emoji(f"🧠 Creating new memory store for agent: {agent_id}")
            self._memories[agent_id] = ConversationMemory()
        return self._memories[agent_id]

    def add_message(self, agent_id: str, message: BaseMessage) -> None:
        """Add a message to an agent's memory."""
        memory = self.get_memory(agent_id)
        memory.messages.append(message)
        
        # Keep only the last N messages
        if len(memory.messages) > memory.max_messages:
            memory.messages = memory.messages[-memory.max_messages:]
        
        logging.info_with_emoji(f"📝 Added message to {agent_id}'s memory. Total messages: {len(memory.messages)}")

    def get_messages(self, agent_id: str) -> List[BaseMessage]:
        """Get all messages for an agent."""
        return self.get_memory(agent_id).messages

    def update_summary(self, agent_id: str, new_summary: str) -> None:
        """Update the conversation summary for an agent."""
        memory = self.get_memory(agent_id)
        memory.summary = new_summary
        logging.info_with_emoji(f"📚 Updated summary for {agent_id}")

    def get_summary(self, agent_id: str) -> str:
        """Get the conversation summary for an agent."""
        return self.get_memory(agent_id).summary

    def get_context(self, agent_id: str) -> Dict:
        """Get the full context (messages + summary) for an agent."""
        memory = self.get_memory(agent_id)
        return {
            "messages": memory.messages,
            "summary": memory.summary
        }

    def clear_memory(self, agent_id: str) -> None:
        """Clear an agent's memory."""
        if agent_id in self._memories:
            self._memories[agent_id] = ConversationMemory()
            logging.info_with_emoji(f"🧹 Cleared memory for {agent_id}")

# Global instance
memory_store = GlobalMemoryStore() 