from flask import Flask
from flask import request
from flask_cors import CORS
import requests

hosturl = "https://kundoluk.edu.gov.kg"

app = Flask(__name__)
CORS(app)


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
    headers = { "Authorization": request.headers.get("Authorization") }
    r = requests.get( hosturl + "/api/student/qmarks/all", params=request.args, headers=headers )
    return r.json()

@app.route("/api/student/gradebook/list", methods=["GET"])
def getGradeList():
    headers = { "Authorization": request.headers.get("Authorization") }
    r = requests.get( hosturl + "/api/student/gradebook/list", params=request.args, headers=headers )
    return r.json()

@app.route("/api/student/gradebook/term/1", methods=["GET"])
def getGradeterm1():
    headers = { "Authorization": request.headers.get("Authorization") }
    r = requests.get( hosturl + "/api/student/gradebook/term/1", params=request.args, headers=headers )
    return r.json()

@app.route("/api/student/gradebook/term/2", methods=["GET"])
def getGradeterm2():
    headers = { "Authorization": request.headers.get("Authorization") }
    r = requests.get( hosturl + "/api/student/gradebook/term/2", params=request.args, headers=headers )
    return r.json()

@app.route("/api/student/gradebook/term/3", methods=["GET"])
def getGradeterm3():
    headers = { "Authorization": request.headers.get("Authorization") }
    r = requests.get( hosturl + "/api/student/gradebook/term/3", params=request.args, headers=headers )
    return r.json()

@app.route("/api/student/gradebook/term/4", methods=["GET"])
def getGradeterm4():
    headers = { "Authorization": request.headers.get("Authorization") }
    r = requests.get( hosturl + "/api/student/gradebook/term/4", params=request.args, headers=headers )
    return r.json()


@app.route("/api/student/homework/list", methods=["GET"])
def getHW():
    headers = { "Authorization": request.headers.get("Authorization") }
    r = requests.get( hosturl + "/api/student/homework/list", params=request.args, headers=headers )
    return r.json()


if __name__ == "__main__":
    app.run( port=34006, host="0.0.0.0" )