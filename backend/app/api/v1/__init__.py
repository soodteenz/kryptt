from fastapi import APIRouter
from .settings import router as settings_router
from .account import router as alpaca_router
from .assets import router as assets_router
from .agents.position_agent import router as position_agent_router
from .agents.order_agent import router as order_agent_router

router = APIRouter(prefix="/v1")
router.include_router(settings_router)
router.include_router(alpaca_router)
router.include_router(assets_router)
router.include_router(position_agent_router)
router.include_router(order_agent_router)
