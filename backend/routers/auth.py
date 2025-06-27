from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/auth")

@router.post("/register")
async def register(email: str, password: str, role: str = "user"):
    # Placeholder implementation
    if not email or not password:
        raise HTTPException(status_code=400, detail="Missing credentials")
    return {"message": "User registered"}

@router.post("/login")
async def login(email: str, password: str):
    if email == "admin" and password:
        return {"access_token": "fake-token", "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")
