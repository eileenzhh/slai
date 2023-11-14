from flask import Blueprint, jsonify, request
authentication = Blueprint('authentication', __name__)


@authentication.route('/login')
def login():
    return "/login called"

@authentication.route('/logout')
def logout():
    return "/logout called"
