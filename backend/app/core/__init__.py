"""
Core Package Initialization

This package handles core functionality and configurations for the Kryptt API.
It contains essential components that are used throughout the application.

Components:
- config.py: Application configuration and environment variables
- dependencies.py: Dependency injection and shared dependencies

Project: Kryptt
Author: Jon
Social Media:
- Twitter: @jondoescoding
"""

from .config import Settings

__all__ = ["Settings", "get_settings"]
