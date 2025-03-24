from pydantic import BaseModel, Field

class APIKeys(BaseModel):
    groq: str = Field(..., description="Groq API key")
    alpaca_api_key: str = Field(..., description="Alpaca API key")
    alpaca_secret_key: str = Field(..., description="Alpaca secret key")
    alpaca_endpoint: str = Field(
        default="https://paper-api.alpaca.markets/v2",
        description="Alpaca API endpoint"
    ) 