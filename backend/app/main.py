"""
Main FastAPI Application Entry Point

This module initializes and configures the FastAPI application.
It serves as the main entry point for the API server.

Key Components:
- FastAPI app instance creation
- Middleware configuration
- API router registration
- Exception handlers
- Startup and shutdown events

Project: Kryptt
Author: Jon
Social Media:
- Twitter: @jondoescoding
"""

import os
from fastapi import FastAPI
from .core.config import get_settings, initialize_trading_client
from .core.cors import setup_cors
from .core.logging import setup_logging, RequestLoggingMiddleware, logging
from .api.v1 import router as api_v1_router
from .api.v1.settings import api_keys_store

# Create FastAPI application
app = FastAPI(
    title="Kryptt API",
    description="Backend API for Kryptt trading application",
    version="1.0.0"
)

# Get settings
settings = get_settings()

# Set up logging
setup_logging(settings)

# Set up CORS
setup_cors(app, settings)

# Add request logging middleware
app.add_middleware(RequestLoggingMiddleware)

# Register API routers
app.include_router(api_v1_router, prefix="/api")

# Create logs directory if it doesn't exist
# os.makedirs("logs", exist_ok=True)

@app.get("/")
async def root():
    """Root endpoint to verify API is running."""
    return {
        "status": "active",
        "message": "Welcome to Kryptt API",
        "docs_url": "/docs",
        "openapi_url": "/openapi.json"
    }

@app.on_event("startup")
async def startup_event():
    """Initialize services on application startup."""
    if "current" in api_keys_store:
        try:
            initialize_trading_client(api_keys_store["current"])
            logging.info_with_emoji("🚀 Trading client initialized successfully")
        except Exception as e:
            logging.error_with_emoji(f"❌ Failed to initialize trading client: {str(e)}")

if __name__ == "__main__":
    # Get port from environment variable or use default
    port = int(os.getenv("PORT", 10000))
    
    # Import and run uvicorn server
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=port,
        reload=False,
        workers=1
    )
