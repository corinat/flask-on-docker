"""
Helpers for converting SQLAlchemy query results to dictionaries for table rendering.
"""


def results_to_dicts(results):
    """
    Convert a list of SQLAlchemy model instances to a list of dictionaries for table display.

    Args:
        results (list): List of SQLAlchemy model instances.

    Returns:
        list: List of dictionaries with runner attributes.
    """
    dicts = []
    for r in results:
        d = {
            "id": r.id,
            "imei": getattr(r, "imei", ""),
            "name": getattr(r, "name", ""),
            "displayname": getattr(r, "displayname", ""),
            "gender": getattr(r, "gender", ""),
            "categ": getattr(r, "categ", ""),
            "club": getattr(r, "club", ""),
            "bib": getattr(r, "bib", ""),
            "age": getattr(r, "age", ""),
            "ranking": getattr(r, "ranking", ""),
            "time_": getattr(r, "time_", ""),
        }
        dicts.append(d)
    return dicts
