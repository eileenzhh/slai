from flask import Blueprint, jsonify, request

from backend.app.main.service import model_integration_service
controller_endpoints = Blueprint('controller_endpoints', __name__)
from app.main.service import image_processing_service, model_integration_service, emr_integration_service

# needs a better name

# Testing

@controller_endpoints.route('/cases', methods=['POST'])
def cases():
    data = request.json
    image_processing_service.process_image()
    model_integration_service.call_model()
    return data
