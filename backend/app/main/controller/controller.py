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
        "isic_id": "ISIC_4577414.jpg",
        "sex": "male",
        "age_approx": "60",
        "anatom_site_general_challenge": "torso",
        "diagnosis": "unknown",
        "benign_malignant": "benign",
    },
    {
        "isic_id": "ISIC_6024863.jpg",
        "sex": "male",
        "age_approx": "50",
        "anatom_site_general_challenge": "torso",
        "diagnosis": "unknown",
        "benign_malignant": "benign",
    },
    {
        "isic_id": "ISIC_0865521.jpg",
        "sex": "male",
        "age_approx": "60",
        "anatom_site_general_challenge": "torso",
        "diagnosis": "unknown",
        "benign_malignant": "benign",
    },
    {
        "isic_id": "ISIC_4434221.jpg",
        "sex": "male",
        "age_approx": "30",
        "anatom_site_general_challenge": "torso",
        "diagnosis": "unknown",
        "benign_malignant": "benign",
    },
    {
        "isic_id": "ISIC_2173487.jpg",
        "sex": "male",
        "age_approx": "75",
        "anatom_site_general_challenge": "torso",
        "diagnosis": "unknown",
        "benign_malignant": "benign",
    },
]
DEMO_IMAGE = base64.b64encode(open("ISIC_0490442.JPG", "rb").read()).decode("utf-8")


### FE endpoints
# Returns all cases in last 5 min
@controller_endpoints.route("/cases", methods=["GET"])
def cases():
    response = []

    # Hard-coded case for demos
    response.append(
        {
            "image": DEMO_IMAGE,
            "cases": DEMO_CASES,
        }
    )

    queue = cache.get_history()
    for timestamp, key in queue:
        response.append(
            {
                "image": cache.images[key],
                "cases": cache.cases[key],
            }
        )

    return jsonify(response)


# Clears all history and current cases
@controller_endpoints.route("/clear", methods=["POST"])
def clear():
    cache.clear_all_cache()
    return jsonify({})


# Returns current case
@controller_endpoints.route("/case", methods=["GET"])
def case():
    response = {}
    current_image, current_cases = cache.get_current_case()
    if current_image and current_cases:
        response["image"] = current_image
        response["cases"] = current_cases

    return jsonify(response)


# Clears current image and cases
@controller_endpoints.route("/discard", methods=["POST"])
def discard():
    cache.clear_current_case()
    return jsonify({})


# Saves current image and cases to history
@controller_endpoints.route("/save", methods=["POST"])
def save():
    cache.save_current_case()
    return jsonify({})


### Mobile endpoints
# receive image from mobile app and get cases from ML
@controller_endpoints.route("/image", methods=["POST"])
def image():
    data = request.json
    image = data["image"]
    dec_img = base64.b64decode(image)

    # for testing
    with open("imageToSave.jpg", "wb") as fh:
        fh.write(base64.b64decode(image))

    cases = model_service.evaluate(dec_img)
    cache.add_current_case(image, cases)

    return jsonify({})


### Misc. other endpoints
@controller_endpoints.route("/upload_to_emr", methods=["POST"])
def upload_to_emr():
    emr_service.call()
    return jsonify({})


@controller_endpoints.route("/cases_testing", methods=["GET"])
def cases_testing():
    data = request.json
    response = {}

    keys = cache.get_history()
    # print(keys)

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


@controller_endpoints.route("/image_ML_testing", methods=["POST"])
def image_ML_testing():
    image = DEMO_IMAGE

    dec_img = base64.b64decode(image)

    # with open("ML_testing.jpg", "wb") as fh:
    #     fh.write(base64.b64decode(image))

    # Add your functions here
    cases = model_service.evaluate(dec_img)
    cache.add_current_case(image, cases)
    return jsonify({})
