from fastapi.testclient import TestClient
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from backend.main import app

client = TestClient(app)

def test_register_missing():
    resp = client.post('/auth/register', params={"email": "", "password": ""})
    assert resp.status_code == 400

def test_login_invalid():
    resp = client.post('/auth/login', params={"email": "foo", "password": "bar"})
    assert resp.status_code == 401
