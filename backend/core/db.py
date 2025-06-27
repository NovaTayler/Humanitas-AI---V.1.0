import os
import asyncpg

_pool: asyncpg.Pool | None = None

async def get_pool() -> asyncpg.Pool:
    global _pool
    if _pool is None:
        db_url = os.getenv("DB_URL")
        if not db_url:
            raise RuntimeError("Missing ENV DB_URL")
        _pool = await asyncpg.create_pool(db_url)
    return _pool
