from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
import psycopg2
from typing import Text
from psycopg2 import connect, Error

# import Python's built-in JSON library
import json

# import the JSON library from psycopg2.extras
from psycopg2.extras import Json

# import psycopg2's 'json' using an alias
from psycopg2.extras import json as psycop_json

# import Python's 'sys' library
import sys


def create_table():
    db_string = create_engine('postgresql://postgres:postgres@localhost:5432/python_data', echo=False)
    conn = db_string.raw_connection()
    db = scoped_session(sessionmaker(bind=db_string))

    cur = conn.cursor()

    cur.execute("CREATE TABLE IF NOT EXISTS runners_ciucas (mytable_key  serial primary key, id bigint, imei bigint, name text, gender text, class text, club text, bib int, age text, ranking int,  time_ date, alt int )")  

    if len(sys.argv) > 1:
        table_name = '_'.join(sys.argv[1:])
    else:
        # ..otherwise revert to a default table name
        table_name = "runners_ciucas"

    print ("\ntable name for JSON data:", table_name)
    with open('trim_runners.json') as json_data:

        record_list = json.load(json_data)
    # concatenate an SQL string
    sql_string = 'INSERT INTO {} '.format( table_name )
    # if record list then get column names from first key
    if type(record_list) == list:
        first_record = record_list[0]

        columns = list(first_record.keys())
        print ("\ncolumn names:", columns)

    # if just one dict obj or nested JSON dict
    else:
        print ("Needs to be an array of JSON objects")
        sys.exit()

    # enclose the column names within parenthesis
    sql_string += "(" + ', '.join(columns) + ")\nVALUES "

    # enumerate over the record
    for i, record_dict in enumerate(record_list):

        # iterate over the values of each record dict object
        values = []
        for col_names, val in record_dict.items():

            # Postgres strings must be enclosed with single quotes
            if type(val) == str:
                # escape apostrophies with two single quotations
                val = val.replace("'", "''")
                val = "'" + val + "'"

            values += [ str(val) ]

        # join the list of values and enclose record in parenthesis
        sql_string += "(" + ', '.join(values) + "),\n"

    # remove the last comma and end statement with a semicolon
    sql_string = sql_string[:-2] + ";"

    print ("\nSQL string:")
    print (sql_string)

    if cur != None:
        
        try:
            cur.execute( sql_string )
            conn.commit()

            print ('\nfinished INSERT INTO execution')

        except (Exception, Error) as error:
            print("\nexecute_sql() error:", error)
            conn.rollback()

create_table()