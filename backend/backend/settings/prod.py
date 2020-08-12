"""Production settings module."""
from backend.settings.base import *

DEBUG = False

ALLOWED_HOSTS = ["*", ]
CORS_ORIGIN_ALLOW_ALL = True

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "postgres",
        "USER": "postgres",
        "PASSWORD": "password",
        "HOST": "db_prod",
        "PORT": "5432",
    }
}

SESSION_ENGINE = "django.contrib.sessions.backends.cache"
