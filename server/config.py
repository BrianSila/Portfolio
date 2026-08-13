import os

# Base directory of the server project (used to build absolute SQLite path)
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    """
    Base configuration class.
    Shared settings across all environments live here; environment-specific
    classes below override only what differs.
    """
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # CORS: origins allowed to call this API
    CORS_ORIGINS = os.environ.get('CORS_ORIGINS', 'http://localhost:5173').split(',')


class DevelopmentConfig(Config):
    """
    Local development configuration.
    Uses a local SQLite file so there's zero setup friction before we
    swap to PostgreSQL. The file lives at server/dev.db.
    """
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL',
        f"sqlite:///{os.path.join(basedir, 'dev.db')}"
    )


class TestingConfig(Config):
    """
    Testing configuration.
    Uses an in-memory SQLite database so tests never touch dev.db or
    a real database, and each test run starts from a clean slate.
    """
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'


class ProductionConfig(Config):
    """
    Production configuration.
    Expects DATABASE_URL to point at a real PostgreSQL instance
    (e.g. postgresql://user:password@host:5432/dbname).
    """
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')


# Maps string names (used in create_app) to their config classes
config_by_name = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
}
