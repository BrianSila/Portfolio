from flask import Flask

from config import config_by_name
from extensions import db, migrate, cors


def create_app(config_name='development'):
    """
    Application Factory.

    Builds and returns a configured Flask app instance rather than
    creating one at import time. This keeps the app testable (different
    configs can be swapped in) and avoids circular imports between
    extensions, models, and blueprints.

    Args:
        config_name (str): One of 'development', 'testing', 'production'.
                            Defaults to 'development'.

    Returns:
        Flask: A fully configured Flask application instance.
    """
    app = Flask(__name__)

    # --- Load configuration ---
    app.config.from_object(config_by_name[config_name])

    # --- Bind extensions to this app instance ---
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, resources={
        r"/api/*": {"origins": app.config['CORS_ORIGINS']}
    })

    # --- Register blueprints ---
    from app.routes.projects import projects_bp
    app.register_blueprint(projects_bp, url_prefix='/api/projects')

    # --- Import models so Flask-Migrate can detect them ---
    # (Models must be imported somewhere before migrations run, or
    # Alembic's autogenerate won't see their tables.)
    from app import models  # noqa: F401

    # --- Basic health check route (useful for verifying the server is up) ---
    @app.route('/api/health')
    def health_check():
        return {'status': 'ok', 'message': 'Flask server is running'}, 200

    return app
