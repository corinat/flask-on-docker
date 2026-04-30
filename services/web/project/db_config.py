import os


def get_psycopg2_db_uri():
    """
    Build the PostgreSQL connection string from environment variables.
    Returns:
        str: The database connection URI.
    """
    return (
        f"dbname={os.getenv('POSTGRES_DB')} "
        f"user={os.getenv('POSTGRES_USER')} "
        f"host={os.getenv('POSTGRES_HOST')} "
        f"password={os.getenv('POSTGRES_PASSWORD')} "
        f"port={os.getenv('POSTGRES_PORT')}"
    )
