import os


def get_database_config():
    """
    Read required PostgreSQL settings from the environment.
    Returns:
        dict: Database settings keyed by env var name.
    Raises:
        ValueError: If any required setting is missing.
    """
    config = {
        "POSTGRES_DB": os.getenv("POSTGRES_DB"),
        "POSTGRES_USER": os.getenv("POSTGRES_USER"),
        "POSTGRES_HOST": os.getenv("POSTGRES_HOST"),
        "POSTGRES_PORT": os.getenv("POSTGRES_PORT"),
        "POSTGRES_PASSWORD": os.getenv("POSTGRES_PASSWORD"),
    }
    missing = [key for key in ("POSTGRES_DB", "POSTGRES_USER", "POSTGRES_HOST", "POSTGRES_PORT") if not config[key]]
    if missing:
        raise ValueError(
            "Missing required environment variables for DB connection: " + ", ".join(missing)
        )
    return config


def get_psycopg2_db_uri():
    """
    Build the PostgreSQL connection string from environment variables.
    Returns:
        str: The database connection URI.
    """
    config = get_database_config()
    return (
        f"dbname={config['POSTGRES_DB']} "
        f"user={config['POSTGRES_USER']} "
        f"host={config['POSTGRES_HOST']} "
        f"password={config['POSTGRES_PASSWORD']} "
        f"port={config['POSTGRES_PORT']}"
    )


def get_sqlalchemy_database_uri():
    """
    Build a SQLAlchemy PostgreSQL connection URL from environment variables.
    Returns:
        str: SQLAlchemy database URI.
    """
    config = get_database_config()
    return (
        f"postgresql+psycopg2://{config['POSTGRES_USER']}:{config['POSTGRES_PASSWORD']}"
        f"@{config['POSTGRES_HOST']}:{config['POSTGRES_PORT']}/{config['POSTGRES_DB']}"
    )
