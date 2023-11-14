from flask import Blueprint, jsonify, request
controller_endpoints = Blueprint('controller_endpoints', __name__)
from app.main.service import imageProcessingService, modelIntegrationService

# needs a better name

# Testing

@controller_endpoints.route('/cases', methods=['POST'])
def cases():
    data = request.json
    imageProcessingService.process_image()
    modelIntegrationService.call_model()
    return data

# incomes = [
#     { 'description': 'salary', 'amount': 5000 }
# ]


# @controller_endpoints.route('/incomes')
# def get_incomes():
#     return jsonify(incomes)


# @controller_endpoints.route('/incomes', methods=['POST'])
# def add_income():
#     incomes.append(request.get_json())
#     return '', 204
