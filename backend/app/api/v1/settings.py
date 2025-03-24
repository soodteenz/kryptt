from fastapi import APIRouter, HTTPException
from app.core.logging import mask_sensitive_data, logging
from .models.settings import APIKeys

router = APIRouter(prefix="/settings", tags=["settings"])

# In-memory storage (this will be lost when server restarts)
api_keys_store = {}

def mask_key(key: str, visible_chars: int = 4) -> str:
    """Mask sensitive key data, showing only the last few characters."""
    if not key:
        return ""
    return f"{'*' * (len(key) - visible_chars)}{key[-visible_chars:]}"

@router.post("/keys")
async def save_api_keys(keys: APIKeys):
    try:
        # Store keys in memory
        api_keys_store["current"] = keys.model_dump()
        
        # Log masked versions of the keys using enhanced logging
        masked_data = mask_sensitive_data({
            "groq": keys.groq,
            "alpaca_api_key": keys.alpaca_api_key,
            "alpaca_secret_key": keys.alpaca_secret_key,
            "alpaca_endpoint": keys.alpaca_endpoint
        })
        
        logging.info_with_emoji(
            f"API Keys Saved Successfully | Data: {masked_data}"
        )
        return {"message": "API keys saved successfully"}
    except Exception as e:
        logging.error_with_emoji(f"Failed to save API keys: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.get("/keys")
async def get_api_keys():
    try:
        if "current" not in api_keys_store:
            logging.warning_with_emoji("No API keys found in storage")
            return {"message": "No API keys found"}
            
        masked_keys = mask_sensitive_data(api_keys_store["current"])
        logging.info_with_emoji(f"API Keys Retrieved | Data: {masked_keys}")
        return api_keys_store["current"]
    except Exception as e:
        logging.error_with_emoji(f"Failed to retrieve API keys: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        ) 