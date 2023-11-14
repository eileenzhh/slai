# import os
# import unittest

# from flask_migrate import Migrate, MigrateCommand
# from flask_script import Manager

# from app import blueprint
# from app.main import create_app, db
# from app.main.model import user, blacklist

# app = create_app(os.getenv('BOILERPLATE_ENV') or 'dev')
# app.register_blueprint(blueprint)

# app.app_context().push()

# manager = Manager(app)

# migrate = Migrate(app, db)

# manager.add_command('db', MigrateCommand)


# @manager.command
# def run():
#     app.run()


# @manager.command
# def test():
#     """Runs the unit tests."""
#     tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
#     result = unittest.TextTestRunner(verbosity=2).run(tests)
#     if result.wasSuccessful():
#         return 0
#     return 1

# if __name__ == '__main__':
#     manager.run()

import os
from flask import Flask
from flask_cors import CORS
from app.main.controller.controller import controller_endpoints
from app.main.controller.authentication import authentication

app = Flask(__name__)
app.register_blueprint(controller_endpoints)
app.register_blueprint(authentication)

CORS(app)


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0")