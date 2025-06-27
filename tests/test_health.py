from fastapi.testclient import TestClient
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from backend.main import app

client = TestClient(app)

def test_health():
    resp = client.get('/api/health')
    assert resp.status_code == 200
    assert resp.json() == {"status": "healthy"}
