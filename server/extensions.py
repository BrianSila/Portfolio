from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

# Extensions are instantiated here WITHOUT an app, then bound to the
# app instance inside create_app() via extension.init_app(app).
# This indirection is what makes the Application Factory pattern work:
# these instances can be imported anywhere (models, blueprints) without
# creating circular imports back to app/__init__.py.

db = SQLAlchemy()
migrate = Migrate()
cors = CORS()
