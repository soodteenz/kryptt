"""
Project: Kryptt
Author: Jon
Social Media:
- Twitter: @jondoescoding
Date: January 2024
"""

from fastapi import HTTPException
from app.core.logging import logging
from app.core.config import get_trading_client
from alpaca.trading.enums import AssetClass, OrderSide, OrderType, TimeInForce
from alpaca.trading.models import Order
from alpaca.trading.requests import MarketOrderRequest, LimitOrderRequest, StopOrderRequest, StopLimitOrderRequest
from ..settings import api_keys_store
from typing import List, Union, Optional
from uuid import UUID
from langchain_core.tools import tool

logger = logging.getLogger(__name__)

@tool
def quick_crypto_order(
    action: str,
    quantity: float,
    crypto: str
) -> Union[Order, str]:
    """
    Create a simple market order for crypto with minimal parameters.
    
    Args:
        action: 'buy' or 'sell'
        quantity: Amount of crypto to trade
        crypto: Cryptocurrency symbol (e.g., 'ETH', 'BTC')
    """
    try:
        # Check if API keys are configured
        if "current" not in api_keys_store:
            error_msg = "Alpaca API keys not configured"
            logger.error_with_emoji(f"🚫 {error_msg}")
            return f"{error_msg}"
            
        keys = api_keys_store["current"]
        
        # Format crypto symbol
        symbol = f"{crypto.upper()}/USD"
        
        # Log order attempt
        logger.info(f"Attempting quick {action} order for {quantity} {crypto}")
        
        # Validate action and convert to OrderSide enum
        action = action.upper()
        if action not in ['BUY', 'SELL']:
            error_msg = f"Invalid action: {action}. Must be 'buy' or 'sell'"
            logger.warning(f"⚠️ {error_msg}")
            return error_msg
        
        # Convert action to OrderSide enum
        order_side = OrderSide.BUY.value if action == 'BUY' else OrderSide.SELL.value
        
        # Validate quantity
        if quantity <= 0:
            error_msg = "Quantity must be greater than 0"
            logger.warning(f"⚠️ {error_msg}")
            return error_msg
        
        # Create market order
        order_request = MarketOrderRequest(
            symbol=symbol,
            qty=quantity,
            side=order_side,
            time_in_force=TimeInForce.GTC
        )
        
        # Submit order with API keys
        trading_client = get_trading_client(keys)
        order = trading_client.submit_order(order_request)
        logger.info(f"✅ Successfully created market order for {quantity} {crypto}")
        return f"Successfully created market order for {quantity} {crypto} \nHere is the order: {order}"
        
    except ValueError as e:
        error_msg = f"Validation error: {str(e)}"
        logger.warning(f"⚠️ {error_msg}")
        return error_msg
        
    except Exception as e:
        error_msg = f"Failed to create order: {str(e)}"
        logger.error(f"❌ {error_msg}")
        return error_msg

@tool
def create_new_order(
    symbol: str,
    side: str,
    type: str,
    qty: Optional[float] = None,
    notional: Optional[float] = None,
    time_in_force: str = "day",
    limit_price: Optional[float] = None,
    stop_price: Optional[float] = None
) -> Union[Order, str]:
    """
    Create a new trading order with comprehensive error handling and logging.
    
    Args:
        symbol: Trading symbol (crypto pair)
        side: Order side ('buy' or 'sell')
        type: Order type ('market', 'limit', 'stop', 'stop_limit')
        qty: Quantity of shares/coins to trade
        notional: Dollar amount to trade (alternative to qty)
        time_in_force: Time in force for the order
        limit_price: Limit price for limit and stop-limit orders
        stop_price: Stop price for stop and stop-limit orders
    """
    try:
        # Log order attempt
        logger.info(f"Attempting to create {type} order for {symbol}")
        
        # Input validation
        if not symbol or not isinstance(symbol, str):
            raise ValueError("Invalid symbol provided")
        
        if not (qty or notional):
            raise ValueError("Either quantity or notional amount must be provided")
        
        if qty and notional:
            raise ValueError("Cannot specify both quantity and notional amount")
            
        if qty and qty <= 0:
            raise ValueError("Quantity must be greater than 0")
            
        if notional and notional <= 0:
            raise ValueError("Notional amount must be greater than 0")
        
        # Validate and convert order side
        try:
            order_side = OrderSide(side.upper())
        except ValueError:
            raise ValueError(f"Invalid order side: {side}. Must be 'buy' or 'sell'")
        
        # Validate and convert time in force
        try:
            time_in_force = TimeInForce(time_in_force.upper())
        except ValueError:
            raise ValueError(f"Invalid time in force: {time_in_force}")
        
        # Get trading client
        trading_client = get_trading_client()
        
        # Create appropriate order request based on type
        order_request = None
        type = type.lower()
        
        if type == "market":
            order_request = MarketOrderRequest(
                symbol=symbol,
                qty=qty,
                notional=notional,
                side=order_side,
                time_in_force=time_in_force
            )
        elif type == "limit" and limit_price:
            order_request = LimitOrderRequest(
                symbol=symbol,
                qty=qty,
                notional=notional,
                side=order_side,
                time_in_force=time_in_force,
                limit_price=limit_price
            )
        elif type == "stop" and stop_price:
            order_request = StopOrderRequest(
                symbol=symbol,
                qty=qty,
                notional=notional,
                side=order_side,
                time_in_force=time_in_force,
                stop_price=stop_price
            )
        elif type == "stop_limit" and stop_price and limit_price:
            order_request = StopLimitOrderRequest(
                symbol=symbol,
                qty=qty,
                notional=notional,
                side=order_side,
                time_in_force=time_in_force,
                stop_price=stop_price,
                limit_price=limit_price
            )
        else:
            raise ValueError(f"Invalid order type or missing required price parameters for {type} order")
        
        # Submit order
        order = trading_client.submit_order(order_request)
        logger.info(f"Successfully created {type} order for {symbol}")
        return order
        
    except ValueError as e:
        logger.error(f"Validation error in create_new_order: {str(e)}")
        return f"I apologize, but I couldn't create the order: {str(e)}"
        
    except Exception as e:
        logger.error(f"Unexpected error in create_new_order: {str(e)}")
        return "I encountered an unexpected error while trying to create your order. Please try again or contact support if the issue persists."