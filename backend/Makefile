# #!/bin/sh
# export FLASK_APP=./backend/controller.py
# pipenv run flask --debug run -h 0.0.0.0

.ONESHELL:

.PHONY: clean install tests run all

clean:
	find . -type f -name '*.pyc' -delete
	find . -type f -name '*.log' -delete

install:
	pipenv install

run:
	pipenv install
	pipenv run flask --debug run -h 0.0.0.0

all: clean install run
