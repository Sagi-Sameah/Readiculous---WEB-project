import os

# Secret key setting from .env for Flask sessions
SECRET_KEY = os.getenv('SECRET_KEY')

DB_URI = os.getenv('DB_URI', 'mongodb://localhost:27017/default_db')

# DB base configuration from .env for modularity and security reasons
DB = {
    'host': os.environ.get('DB_HOST'),
    'user': os.environ.get('DB_USER'),
    'password': os.environ.get('DB_PASSWORD'),
    'database': os.environ.get('DB_NAME')
}
