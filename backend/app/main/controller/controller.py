from flask import Blueprint, jsonify, request
import base64


controller_endpoints = Blueprint("controller_endpoints", __name__)
from app.main.service import (
    image_processing_service,
    model_integration_service,
    emr_integration_service,
    cache_service,
)

cache = cache_service.Cache_Service()
model_service = model_integration_service.Model_Service()


# Returns all cases in last 5 min
@controller_endpoints.route("/cases", methods=["GET"])
def cases():
    data = request.json
    # print(cache.images)
    response = {}

    keys = cache.get()
    print(keys)

    for key in keys:
        response[key] = {
            "image": cache.images[key],
            "cases": cache.cases[key],
        }

    # hard-coded response for testing
    # for key in range(2):
    #     response[key] = {
    #         "image": "byte_data",
    #         "cases": [
    #             "/static/images/ISIC_0015719.jpg",
    #             "/static/images/ISIC_0052212.jpg",
    #         ],
    #     }

    return jsonify(response)


@controller_endpoints.route("/clear", methods=["GET"])
def clear():
    cache.clear_all_cache()
    return jsonify({})


# Returns most recent case id
# @controller_endpoints.route("/case", methods=["GET"])
# def case():
#     data = request.json
#     response = {}

#     keys = cache.get()
#     print(keys)

#     if keys:
#         response = {
#             "image": cache_service.images[keys[-1]],
#             "cases": cache_service.cases[keys[-1]],
#         }

# hard-coded response for testing
# response = {
#     "image": "byte_data",
#     "cases": [
#         "/static/images/ISIC_0015719.jpg",
#         "/static/images/ISIC_0052212.jpg",
#     ],
# }

# return jsonify(response)


# Returns most recent case id
@controller_endpoints.route("/image", methods=["POST"])
def image():
    data = request.json

    # for testing
    with open("imageToSave.png", "wb") as fh:
        fh.write(base64.b64decode(data["image"]))

    image = data["image"]
    cases = model_service.call_model(image)

    cache.add(image, cases)

    return jsonify({})
