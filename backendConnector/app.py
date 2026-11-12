from flask import Flask
from flask import request
from flask_cors import CORS
import requests

hosturl = "https://kundoluk.edu.gov.kg"

app = Flask(__name__)
CORS(app)


def forward_get(path):
    headers = {"Authorization": request.headers.get("Authorization")}
    try:
        response = requests.get(
            hosturl + path,
            params=request.args,
            headers=headers,
            timeout=10,
        )
    except requests.exceptions.RequestException as e:
        app.logger.error("Upstream request failed for %s: %s", path, e)
        return {"error": "Upstream request failed"}, 502

    try:
        data = response.json()
    except requests.exceptions.JSONDecodeError:
        app.logger.error(
            "Upstream returned non-JSON response for %s (HTTP %s, Content-Type %s)",
            path,
            response.status_code,
            response.headers.get("Content-Type"),
        )
        status = response.status_code if response.status_code >= 400 else 502
        return {
            "error": "Upstream returned a non-JSON response",
            "upstream_status": response.status_code,
        }, status

    return data, response.status_code


@app.route("/api/auth/loginStudent", methods=["POST"])
def loginStudent():
    if request.is_json:
        # Provide browser-like headers to prevent the server from dropping the connection
        headers = {
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "application/json, text/plain, */*",
            "Origin": "https://kundoluk.edu.gov.kg",
            "Referer": "https://kundoluk.edu.gov.kg/"
        }
        
        try:
            r = requests.post(
                hosturl + "/api/auth/loginStudent", 
                json=request.json, 
                headers=headers,
                timeout=10
            )
            return r.json(), r.status_code
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}, 500
    else: 
        return "notJson", 400

@app.route("/api/student/qmarks/all", methods=["GET"])
def getQmarks():
    return forward_get("/api/student/qmarks/all")

@app.route("/api/student/gradebook/list", methods=["GET"])
def getGradeList():
    return forward_get("/api/student/gradebook/list")

@app.route("/api/student/gradebook/term/1", methods=["GET"])
def getGradeterm1():
    return forward_get("/api/student/gradebook/term/1")

@app.route("/api/student/gradebook/term/2", methods=["GET"])
def getGradeterm2():
    return forward_get("/api/student/gradebook/term/2")

@app.route("/api/student/gradebook/term/3", methods=["GET"])
def getGradeterm3():
    return forward_get("/api/student/gradebook/term/3")

@app.route("/api/student/gradebook/term/4", methods=["GET"])
def getGradeterm4():
    return forward_get("/api/student/gradebook/term/4")


@app.route("/api/student/homework/list", methods=["GET"])
def getHW():
    return forward_get("/api/student/homework/list")


if __name__ == "__main__":
    app.run( port=34006, host="0.0.0.0" )