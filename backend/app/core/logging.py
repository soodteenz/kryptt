"""
Logging Configuration

This module configures logging for the API, including request/response logging
and general application logging.

Project: Kryptt
Author: Jon
Social Media:
- Twitter: @jondoescoding
"""

import logging
import time
from typing import Any, Dict
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from .config import Settings

# Emoji constants for different log types
LOG_EMOJIS = {
    "request": "🚀",
    "success": "✅",
    "error": "❌",
    "warning": "⚠️",
    "info": "ℹ️",
    "database": "🔋",
    "security": "🔒"
}

def mask_sensitive_data(data: Dict[str, Any]) -> Dict[str, Any]:
    """Mask sensitive data in logs."""
    sensitive_fields = ['password', 'token', 'api_key', 'secret', 'key', 'authorization']
    masked_data = data.copy()
    
    def mask_value(value: str) -> str:
        if not value:
            return value
        return f"{'*' * (len(str(value)) - 4)}{str(value)[-4:]}"
    
    def recursive_mask(obj: Any) -> Any:
        if isinstance(obj, dict):
            return {
                k: mask_value(v) if any(sensitive in k.lower() for sensitive in sensitive_fields)
                else recursive_mask(v)
                for k, v in obj.items()
            }
        elif isinstance(obj, list):
            return [recursive_mask(item) for item in obj]
        return obj
    
    return recursive_mask(masked_data)

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """Middleware for logging HTTP requests and responses."""
    
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        
        # Log request start
        logging.info(
            f"{LOG_EMOJIS['request']} Request Started | "
            f"Method: {request.method} | "
            f"Path: {request.url.path} | "
            f"Client: {request.client.host if request.client else 'Unknown'}"
        )
        
        try:
            # Process request
            response = await call_next(request)
            
            # Calculate processing time
            process_time = (time.time() - start_time) * 1000  # Convert to milliseconds
            
            # Determine emoji based on status code
            status_emoji = LOG_EMOJIS['success'] if response.status_code < 400 else LOG_EMOJIS['error']
            
            # Log response
            logging.info(
                f"{status_emoji} Request Completed | "
                f"Method: {request.method} | "
                f"Path: {request.url.path} | "
                f"Status: {response.status_code} | "
            )
            
            return response
            
        except Exception as e:
            logging.error(
                f"{LOG_EMOJIS['error']} Request Failed | "
                f"Method: {request.method} | "
                f"Path: {request.url.path} | "
                f"Error: {str(e)}"
            )
            raise

def setup_logging(settings: Settings) -> None:
    """Configure logging for the application."""
    log_level = logging.DEBUG if settings.DEBUG else logging.INFO
    
    # Custom log format with timestamp and level
    log_format = '%(asctime)s | %(levelname)s | %(message)s'
    
    logging.basicConfig(
        level=log_level,
        format=log_format,
        handlers=[
            logging.StreamHandler(),
        ],
    )
    
    # Add custom logging methods
    def info_with_emoji(msg: str, *args, **kwargs):
        logging.info(f"{LOG_EMOJIS['info']} {msg}", *args, **kwargs)
    
    def error_with_emoji(msg: str, *args, **kwargs):
        logging.error(f"{LOG_EMOJIS['error']} {msg}", *args, **kwargs)
    
    def warning_with_emoji(msg: str, *args, **kwargs):
        logging.warning(f"{LOG_EMOJIS['warning']} {msg}", *args, **kwargs)
    
    # Attach custom methods to logging
    logging.info_with_emoji = info_with_emoji
    logging.error_with_emoji = error_with_emoji
    logging.warning_with_emoji = warning_with_emoji
    
    # Suppress noisy logs
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("fastapi").setLevel(logging.WARNING) 