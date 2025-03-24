from fastapi import APIRouter, HTTPException
from app.core.logging import logging
from app.core.config import get_trading_client
from alpaca.trading.requests import GetAssetsRequest
from alpaca.trading.enums import AssetClass, AssetStatus
from .settings import api_keys_store
from typing import List, Dict
from alpaca.trading.models import Asset

router = APIRouter(prefix="/assets", tags=["alpaca"])

def asset_to_dict(asset: Asset) -> Dict:
    """
    Convert an Alpaca Asset object to a dictionary with relevant crypto fields.
    
    Args:
        asset (Asset): Alpaca Asset object
        
    Returns:
        Dict: Dictionary containing essential crypto asset information
    """
    return {
        "id": str(asset.id),
        "class": asset.asset_class.value.lower(),
        "exchange": asset.exchange.value,
        "symbol": asset.symbol,
        "name": asset.name,
        "min_order_size": asset.min_order_size,
        "price_increment": asset.price_increment
    }

@router.get("/crypto")
async def get_all_available_crypto_assets() -> List[Dict]:
    """
    Retrieves ALL Alpaca trading crypto assets which are available to be traded.
    
    Returns:
        List[Dict]: List of available crypto assets including:
        - Symbol
        - Name
        - Status
        - Tradable flag
        - Asset class details
        - Minimum order size
        - Price increment
        
    Raises:
        HTTPException: 
            - 500: Internal server error if Alpaca API call fails
            - 404: If API keys are not configured
    """
    logging.info_with_emoji("Crypto Asset Retrieval has begun...")
    
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
        
        # Search specifically for crypto assets
        search_params = GetAssetsRequest(status=AssetStatus.ACTIVE, asset_class=AssetClass.CRYPTO)
        
        logging.info_with_emoji("Fetching all crypto assets from Alpaca")
        assets = trading_client.get_all_assets(search_params)
        
        # Convert assets to dictionary format
        asset_dicts = [asset_to_dict(asset) for asset in assets]
        
        logging.info_with_emoji(f"Successfully retrieved {len(asset_dicts)} crypto assets")
        return asset_dicts
        
    except HTTPException as he:
        logging.error_with_emoji(f"HTTP Exception: {str(he)}")
        raise he
    except Exception as e:
        logging.error_with_emoji(f"Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get crypto assets: {str(e)}"
        )

    