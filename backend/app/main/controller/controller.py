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
model_service = model_integration_service.Model_Integration_Service()
emr_service = emr_integration_service.EMR_Integration_Service()

DEMO_CASES = [
    {
        "filename": "ISIC_4577414.jpg",
        "sex": "male",
        "age_approx": "60",
        "anatom_site_general_challenge": "torso",
        "diagnosis": "unknown",
        "benign_malignant": "benign",
    },
    {
        "filename": "ISIC_3747575.jpg",
        "sex": "male",
        "age_approx": "45",
        "anatom_site_general_challenge": "torso",
        "diagnosis": "unknown",
        "benign_malignant": "benign",
    },
    {
        "filename": "ISIC_4434221.jpg",
        "sex": "male",
        "age_approx": "30",
        "anatom_site_general_challenge": "torso",
        "diagnosis": "unknown",
        "benign_malignant": "benign",
    },
    {
        "filename": "ISIC_4577414.jpg",
        "sex": "male",
        "age_approx": "60",
        "anatom_site_general_challenge": "lower extremity",
        "diagnosis": "unknown",
        "benign_malignant": "benign",
    },
]


# Returns all cases in last 5 min
@controller_endpoints.route("/cases", methods=["GET"])
def cases():
    response = []

    keys = cache.get()
    print(keys)
    response.append(
        {
            "image": base64.b64encode(open("ISIC_0490442.JPG", "rb").read()).decode(
                "utf-8"
            ),
            "cases": DEMO_CASES,
        }
    )
    for key in keys:
        response.append(
            {
                "image": cache.images[key],
                "cases": cache.cases[key],
            }
        )

    return jsonify(response)


@controller_endpoints.route("/cases_testing", methods=["GET"])
def cases_testing():
    data = request.json
    response = {}

    keys = cache.get()
    print(keys)

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


# Mobile endpoint: receive image of mole from mobile app
@controller_endpoints.route("/image", methods=["POST"])
def image():
    data = request.json

    # for testing
    with open("imageToSave.jpg", "wb") as fh:
        fh.write(base64.b64decode(data["image"]))

    image = data["image"]
    cases = model_service.evaluate()

    cache.add(image, cases)

    return jsonify({})


@controller_endpoints.route("/upload_to_emr", methods=["POST"])
def upload_to_emr():
    data = request.json

    # for testing
    with open("imageToSave.jpg", "wb") as fh:
        fh.write(base64.b64decode(data["image"]))

    image = data["image"]
    cases = model_service.evaluate()

    cache.add(image, cases)

    return jsonify({})
