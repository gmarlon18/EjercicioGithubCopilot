from fastapi.testclient import TestClient

from src.app import app

client = TestClient(app)


def test_unregister_participant_removes_student_from_activity():
    email = "newstudent@mergington.edu"

    post_response = client.post(f"/activities/Chess Club/signup?email={email}")
    assert post_response.status_code == 200

    delete_response = client.delete(f"/activities/Chess Club/participants?email={email}")
    assert delete_response.status_code == 200
    assert email not in client.get("/activities").json()["Chess Club"]["participants"]


def test_unregister_missing_participant_returns_not_found():
    email = "missingstudent@mergington.edu"

    response = client.delete(f"/activities/Chess Club/participants?email={email}")

    assert response.status_code == 404
    assert response.json()["detail"] == "Participant not found"
