from fastapi import APIRouter, HTTPException
from app.core.logging import logging
from app.core.config import get_trading_client
from .models.alpaca_user_data import TradeAccountResponse
from .settings import api_keys_store

router = APIRouter(prefix="/alpaca", tags=["alpaca"])

@router.get("/account", response_model=TradeAccountResponse)
async def get_account_details():
    """
    Retrieve Alpaca trading account details.
    
    Returns:
        TradeAccountResponse: Account information including:
        - Account status and numbers
        - Buying power and cash balances
        - Portfolio values and margins
        - Trading permissions and restrictions
        
    Raises:
        HTTPException: 
            - 500: Internal server error if Alpaca API call fails
            - 404: If API keys are not configured
    """
    logging.info_with_emoji("Starting account details retrieval")
    
    try:
        if "current" not in api_keys_store:
            logging.error_with_emoji("API keys not found in store")
            raise HTTPException(
                status_code=404,
                detail="Alpaca API keys not configured"
            )
            
        keys = api_keys_store["current"]
        logging.info_with_emoji("Getting Alpaca Trading Client instance")
        
        trading_client = get_trading_client(keys)

        logging.info_with_emoji("Fetching account information from Alpaca")
        client_information = trading_client.get_account()
        
        logging.info_with_emoji(
            f"Account information retrieved successfully. Account status: {client_information.status}"
        )
        return client_information
        
    except HTTPException as he:
        logging.error_with_emoji(f"HTTP Exception: {str(he)}")
        raise he
    except Exception as e:
        logging.error_with_emoji(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get account details: {str(e)}"
        )