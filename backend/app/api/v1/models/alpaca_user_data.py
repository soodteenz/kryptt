"""
Project: Kryptt
Author: Jon
Social Media:
- Twitter: @jondoescoding
Date: January 2024
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from uuid import UUID

class TradeAccountResponse(BaseModel):
    id: UUID
    account_number: str
    status: str
    crypto_status: Optional[str]
    currency: str
    buying_power: str
    regt_buying_power: str
    daytrading_buying_power: str
    non_marginable_buying_power: Optional[str]
    cash: str
    portfolio_value: str
    pattern_day_trader: bool
    trading_blocked: bool
    transfers_blocked: bool
    account_blocked: bool
    created_at: datetime
    trade_suspended_by_user: bool
    multiplier: str
    shorting_enabled: bool
    equity: str
    last_equity: str
    long_market_value: str
    short_market_value: str
    initial_margin: str
    maintenance_margin: str
    last_maintenance_margin: str
    sma: str
    daytrade_count: int
