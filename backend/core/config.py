from dataclasses import dataclass
import os
import secrets

@dataclass
class Config:
    NODE_ID: str = f"om-{secrets.token_hex(16)}"
    SECRET_KEY: str = os.getenv("SECRET_KEY") or RuntimeError("Missing ENV SECRET_KEY")
    JWT_SECRET: str = os.getenv("JWT_SECRET") or RuntimeError("Missing ENV JWT_SECRET")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD") or RuntimeError("Missing ENV ADMIN_PASSWORD")
    HOST: str = "0.0.0.0"
    PORT: int = 8080
    DB_URL: str = os.getenv("DB_URL") or RuntimeError("Missing ENV DB_URL")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    MODEL_PATH: str = "./models"
    TORCH_DEVICE: str = "cpu"

config = Config()
