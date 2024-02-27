from flask import Blueprint, jsonify, request


controller_endpoints = Blueprint("controller_endpoints", __name__)
from app.main.service import (
    image_processing_service,
    model_integration_service,
    emr_integration_service,
    cache_service,
)

cache_service = cache_service.Cache_Service()


# Returns all cases in last 5 min
@controller_endpoints.route("/cases", methods=["GET"])
def cases():
    data = request.json
    print(cache_service.images)
    response = {}

    keys = cache_service.get()
    print(keys)

    # for key in keys:
    #     response[key] = {
    #         "image": cache_service.images[key],
    #         "cases": cache_service.cases[key],
    #     }

    # hard-coded response for testing
    for key in range(2):
        response[key] = {
            "image": "byte_data",
            "cases": [
                "/static/images/ISIC_0015719.jpg",
                "/static/images/ISIC_0052212.jpg",
            ],
        }

    return jsonify(response)


# Returns most recent case id
@controller_endpoints.route("/case", methods=["GET"])
def case():
    data = request.json
    print(cache_service.images)
    response = {}

    keys = cache_service.get()
    print(keys)

    # if keys:
    #     response = {
    #         "image": cache_service.images[keys[-1]],
    #         "cases": cache_service.cases[keys[-1]],
    #     }

    # hard-coded response for testing
    if keys:
        response = {
            "image": "byte_data",
            "cases": [
                "/static/images/ISIC_0015719.jpg",
                "/static/images/ISIC_0052212.jpg",
            ],
        }

    return jsonify(response)
