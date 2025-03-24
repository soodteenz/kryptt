from pydantic import BaseModel

class CryptoPosition(BaseModel):
    """
    Represents a filtered crypto position with non-null values and standardized number formats.
    """
    symbol: str
    exchange: str
    asset_class: str
    asset_marginable: bool
    avg_entry_price: str
    qty: str
    side: str
    market_value: str = "0"
    cost_basis: str
    unrealized_pl: str = "0"
    unrealized_plpc: str = "0"
    unrealized_intraday_pl: str = "0"
    unrealized_intraday_plpc: str = "0"
    current_price: str = "0"
    lastday_price: str = "0"
    change_today: str = "0"
    swap_rate: str = "0"
    avg_entry_swap_rate: str = "0"
    qty_available: str = "0"