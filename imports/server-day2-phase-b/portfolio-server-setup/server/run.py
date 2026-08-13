import os

from app import create_app

# Reads FLASK_ENV (or defaults to 'development') to select the config class
config_name = os.environ.get('FLASK_ENV', 'development')
app = create_app(config_name)

if __name__ == '__main__':
    # Runs the Flask dev server directly via `python run.py`.
    # Equivalent to `flask run` when FLASK_APP=run.py is set (see .flaskenv).
    app.run(host='0.0.0.0', port=5000, debug=True)
