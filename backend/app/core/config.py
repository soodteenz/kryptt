"""
Application Configuration Settings

This module manages all configuration settings for the Kryptt API.
It uses Pydantic's BaseSettings for automatic environment variable loading
and validation, with Infisical integration for secure secret management.

Configuration Categories:
- API settings (title, version, description)
- Database settings
- Security settings
- External service configurations

Environment Variables:
- INFISICAL_TOKEN: Infisical authentication token
- INFISICAL_HOST: Infisical host URL
- PROJECT_ID: Infisical project ID
- ENVIRONMENT: Current environment (development/staging/production)

Project: Kryptt
Author: Jon
Social Media:
- Twitter: @jondoescoding
"""

import os
import logging
from typing import Optional, Dict
from pydantic_settings import BaseSettings
from functools import lru_cache
from alpaca.trading.client import TradingClient


class Settings(BaseSettings):
    """Application settings with environment variable support and Infisical integration."""
    
    # API Settings
    API_VERSION: str = "1.0.0"
    PROJECT_NAME: str = "Kryptt API"
    DEBUG: bool = False
    
    # Logging Settings
    LOG_LEVEL: str = "INFO"
    LOG_FORMAT: str = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    
    class Config:
        """Pydantic config for environment variable loading."""
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    """Create cached instance of settings."""
    return Settings()

def setup_logging(settings: Settings) -> None:
    """Configure logging with the specified settings."""
    logging.basicConfig(
        level=getattr(logging, settings.LOG_LEVEL),
        format=settings.LOG_FORMAT
    )

# Cache for the TradingClient instance
_trading_client_instance = None

def initialize_trading_client(api_keys: Dict[str, str]) -> None:
    """
    Initialize the global TradingClient instance.
    
    Args:
        api_keys: Dictionary containing alpaca_api_key and alpaca_secret_key
    """
    global _trading_client_instance
    _trading_client_instance = TradingClient(
        api_key=api_keys["alpaca_api_key"],
        secret_key=api_keys["alpaca_secret_key"],
        paper=True
    )

def get_trading_client(api_keys: Dict[str, str] = None) -> TradingClient:
    """
    Get the cached TradingClient instance.
    
    Args:
        api_keys: Optional dictionary containing API keys for initialization if needed
        
    Returns:
        TradingClient: Cached instance of the Alpaca TradingClient
        
    Raises:
        RuntimeError: If trading client is not initialized
    """
    global _trading_client_instance
    
    if _trading_client_instance is None:
        if api_keys is None:
            raise RuntimeError("Trading client not initialized")
        initialize_trading_client(api_keys)
    
    return _trading_client_instance

def reset_trading_client() -> None:
    """Reset the cached TradingClient instance."""
    global _trading_client_instance
    _trading_client_instance = None
