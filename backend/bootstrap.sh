#!/bin/sh
export FLASK_APP=./backend/controller.py
pipenv run flask --debug run -h 0.0.0.0