"""
CORS Configuration

This module configures Cross-Origin Resource Sharing (CORS) for the API.
It defines allowed origins, methods, and headers for cross-origin requests.

Project: Kryptt
Author: Jon
Social Media:
- Twitter: @jondoescoding
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import Settings

def setup_cors(app: FastAPI, settings: Settings) -> None:
    """Configure CORS for the application."""
    origins = [
        "http://localhost:3000",    # Next.js development server
        "http://127.0.0.1:3000",    # Alternative local development
        "http://localhost:8000",    # FastAPI development server
        "http://127.0.0.1:8000",    # Alternative FastAPI local,
        "*" # all origins
    ]
    
    # Add production origins if not in debug mode
    if not settings.DEBUG:
        origins.extend([
            "https://kryptt.com",
            "https://api.kryptt.com",
        ])
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=[
            "Content-Type",
            "Authorization",
            "Accept",
            "Origin",
            "X-Requested-With",
        ],
    ) 