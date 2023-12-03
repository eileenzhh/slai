from flask import Blueprint, jsonify, request
authentication = Blueprint('authentication', __name__)
from app.main.service import authentication_service

@authentication.route('/login')
def login():
    authentication_service.login()
    return "/login called"

@authentication.route('/logout')
def logout():
    authentication_service.logout()
    return "/logout called"
