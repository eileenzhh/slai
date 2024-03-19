import os
from flask import Flask
from flask_cors import CORS
from app.main.controller.controller import controller_endpoints
from app.main.controller.authentication import authentication

app = Flask(__name__)
app.register_blueprint(controller_endpoints)
app.register_blueprint(authentication)

CORS(app)


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0")
