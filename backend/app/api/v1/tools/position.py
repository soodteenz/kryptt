from fastapi import HTTPException
from app.core.logging import logging
from app.core.config import get_trading_client
from alpaca.trading.enums import AssetClass
from alpaca.trading.models import Order
from ..settings import api_keys_store
from typing import List, Union
from uuid import UUID
from ..models.position import CryptoPosition
from langchain_core.tools import tool

@tool
async def get_crypto_positions() -> List[CryptoPosition]:
    """
    Retrieves all crypto positions (open or closed) sorted by current price.
    Filters out null values and converts numeric nulls to "0".
    
    Returns:
        List[CryptoPosition]: Sorted list of crypto positions with standardized values
    
    Raises:
        HTTPException: 
            - 500: Internal server error if Alpaca API call fails
            - 404: If API keys are not configured
    """
    logging.info_with_emoji("🔍 Starting crypto positions retrieval...")
    
    try:
        if "current" not in api_keys_store:
            logging.error_with_emoji("🚫 API keys not found in store")
            raise HTTPException(
                status_code=404,
                detail="Alpaca API keys not configured"
            )
            
        keys = api_keys_store["current"]
        logging.info_with_emoji("🔑 Initializing Alpaca Trading Client")
        
        trading_client = get_trading_client(keys)
        
        logging.info_with_emoji("📊 Fetching all positions from Alpaca")
        all_positions = trading_client.get_all_positions()
        
        logging.info_with_emoji("🔎 Filtering for crypto positions")
        crypto_positions = [
            position for position in all_positions 
            if position.asset_class == AssetClass.CRYPTO
        ]
        
        logging.info_with_emoji("🧹 Cleaning position data and removing null values")
        cleaned_positions = []
        null_field_count = 0
        
        for position in crypto_positions:
            position_dict = position.dict()
            # Remove asset_id
            position_dict.pop('asset_id', None)
            
            # Convert numeric nulls to "0"
            numeric_fields = [
                'market_value', 'unrealized_pl', 'unrealized_plpc',
                'unrealized_intraday_pl', 'unrealized_intraday_plpc',
                'current_price', 'lastday_price', 'change_today',
                'swap_rate', 'avg_entry_swap_rate', 'qty_available'
            ]
            
            for field in numeric_fields:
                if position_dict.get(field) is None:
                    position_dict[field] = "0"
                    null_field_count += 1
            
            cleaned_positions.append(CryptoPosition(**position_dict))
            
        logging.info_with_emoji(f"🔄 Converted {null_field_count} null numeric values to '0'")
        
        logging.info_with_emoji("📈 Sorting positions by current price")
        sorted_positions = sorted(
            cleaned_positions,
            key=lambda x: float(x.current_price),
            reverse=True
        )
        
        logging.info_with_emoji(f"✅ Successfully retrieved and cleaned {len(sorted_positions)} crypto positions")
        return sorted_positions
        
    except HTTPException as he:
        logging.error_with_emoji(f"❌ HTTP Exception: {str(he)}")
        raise he
    except Exception as e:
        logging.error_with_emoji(f"❌ Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get crypto positions: {str(e)}"
        )
    
@tool
async def get_open_position(symbol_or_asset_id: Union[UUID, str]) -> CryptoPosition:
    """
    Gets a single open crypto position by symbol or asset ID.
    
    Args:
        symbol_or_asset_id: The symbol or asset ID of the crypto position
        
    Returns:
        CryptoPosition: The cleaned and standardized position data
        
    Raises:
        HTTPException: 
            - 404: Position not found or API keys not configured
            - 400: Invalid asset type (non-crypto)
            - 500: Internal server error
    """
    logging.info_with_emoji(f"🔍 Fetching open position for {symbol_or_asset_id}...")
    
    try:
        trading_client = get_trading_client()
        
        # Get the position
        try:
            position = trading_client.get_open_position(str(symbol_or_asset_id))
        except Exception as e:
            if "position does not exist" in str(e).lower():
                raise HTTPException(
                    status_code=404,
                    detail=f"No open position found for {symbol_or_asset_id}"
                )
            raise
            
        # Validate it's a crypto position
        if position.asset_class != AssetClass.CRYPTO:
            raise HTTPException(
                status_code=400,
                detail=f"Asset {symbol_or_asset_id} is not a cryptocurrency"
            )
            
        # Clean the position data
        position_dict = position.dict()
        position_dict.pop('asset_id', None)
        
        # Convert numeric nulls to "0"
        numeric_fields = [
            'market_value', 'unrealized_pl', 'unrealized_plpc',
            'unrealized_intraday_pl', 'unrealized_intraday_plpc',
            'current_price', 'lastday_price', 'change_today',
            'swap_rate', 'avg_entry_swap_rate', 'qty_available'
        ]
        
        for field in numeric_fields:
            if position_dict.get(field) is None:
                position_dict[field] = "0"
                
        cleaned_position = CryptoPosition(**position_dict)
        logging.info_with_emoji(f"✅ Successfully retrieved position for {symbol_or_asset_id}")
        
        return cleaned_position
        
    except HTTPException as he:
        logging.error_with_emoji(f"❌ HTTP Exception: {str(he)}")
        raise he
    except Exception as e:
        logging.error_with_emoji(f"❌ Unexpected error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to get position: {str(e)}"
        )
    
@tool
async def close_a_position(symbol_or_asset_id: Union[UUID, str]) -> Order:
    """
    Closes a crypto position completely for the given symbol or asset ID.
    
    Args:
        symbol_or_asset_id: The symbol or asset ID of the crypto position to close
        
    Returns:
        Order: The order details for the closed position
        
    Raises:
        HTTPException: 
            - 404: Position not found
            - 400: Invalid asset type (non-crypto)
            - 500: Internal server error
    """
    logging.info_with_emoji(f"🔄 Starting closure of position for {symbol_or_asset_id}...")
    
    try:
        trading_client = get_trading_client()
        
        # Verify it's a crypto position first
        position = trading_client.get_open_position(str(symbol_or_asset_id))
        if position.asset_class != AssetClass.CRYPTO:
            raise HTTPException(
                status_code=400,
                detail=f"Asset {symbol_or_asset_id} is not a cryptocurrency"
            )
            
        # Close the position
        logging.info_with_emoji(f"📉 Closing position for {symbol_or_asset_id}")
        closure_result = trading_client.close_position(str(symbol_or_asset_id))
        
        # Log the closure details
        logging.info_with_emoji(f"✅ Successfully closed position for {symbol_or_asset_id}")
        logging.info_with_emoji(f"📊 Closure details: {closure_result}")
        
        return f"Here are the details of the sucessful closure: {closure_result}"
        
    except HTTPException as he:
        logging.error_with_emoji(f"❌ HTTP Exception: {str(he)}")
        raise he
    except Exception as e:
        logging.error_with_emoji(f"❌ Unexpected error while closing position: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to close position: {str(e)}"
        )
