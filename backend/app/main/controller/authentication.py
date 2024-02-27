from flask import Blueprint, jsonify, request
from app.main.service import authentication_service

authentication = Blueprint("authentication", __name__)


@authentication.route("/login", methods=["POST"])
def login():
    data = request.json
    authentication_service.login()
    return data


@authentication.route("/logout", methods=["POST"])
def logout():
    data = request.json
    authentication_service.logout()
    return data
