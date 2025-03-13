#!/usr/bin/python3
# -*- coding: utf-8 -*-

# https://kb.objectrocket.com/postgresql/insert-json-data-into-postgresql-using-python-part-1-1247
# https://kb.objectrocket.com/postgresql/insert-json-data-into-postgresql-using-python-part-2-1248

# import the psycopg2 database adapter for PostgreSQL
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

# accept command line arguments for the Postgres table name
if len(sys.argv) > 1:
    table_name = '_'.join(sys.argv[1:])
else:
    # ..otherwise revert to a default table name
    table_name = "runners_ciucas"

print ("\ntable name for JSON data:", table_name)

# use Python's open() function to load the JSON data
# with open('json_postgres.json') as json_data:
with open('trim_runners.json') as json_data:
    # use load() rather than loads() for JSON files
    record_list = json.load(json_data)

print ("\nrecords:", record_list)
print ("\nJSON records object type:", type(record_list)) # should return "<class 'list'>"

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

# create table json_table (id int primary key,type varchar(20),properties json)
# CREATE TABLE ciucas_route
# (
#     mytable_key    serial primary key,
#     ele            float8,
#     xcoord         float,
#     ycoord         float,
#     distance       float  
# );
DATABASE_URI = 'postgresql+psycopg2://postgres:postgres@localhost:5433/postgres'
try:
    # declare a new PostgreSQL connection object
    conn = connect(
        dbname = "postgres",
        user = "postgres",
        host = "localhost",
        password = "postgres",
        port = 5433,
        # attempt to connect for 3 seconds then raise exception
        connect_timeout = 3
    )

    cur = conn.cursor()
    print ("\ncreated cursor object:", cur)

except (Exception, Error) as err:
    print ("\npsycopg2 connect error:", err)
    conn = None
    cur = None

# only attempt to execute SQL if cursor is valid
if cur != None:

    try:
        cur.execute( sql_string )
        conn.commit()

        print ('\nfinished INSERT INTO execution')

    except (Exception, Error) as error:
        print("\nexecute_sql() error:", error)
        conn.rollback()

    # close the cursor and connection
    cur.close()
    conn.close()



# insert json as unstrucred data
# import psycopg2
# connection = psycopg2.connect(dbname = "postgres",
#         user = "postgres",
#         host = "localhost",
#         password = "postgres",
#         # attempt to connect for 3 seconds then raise exception
#         connect_timeout = 3)
# cursor = connection.cursor()
# cursor.execute("set search_path to public")


# with open('json_test.json') as file:
#     # change json.load(file) to file.read()
#     data = file.read()

# # Just put a placeholder %s instead of using {} and .format().
# query_sql = """
# insert into json_table select * from
# json_populate_recordset(NULL::json_table, %s);
# """

# # change .execute(query_sql) to .execute(query_sql, (data,))
# cursor.execute(query_sql, (data,))
# # Add a commit on the connection.
# connection.commit()

# CREATE TABLE runners_ciucas(
#     mytable_key  serial primary key,
#     id           bigint,
#     imei         bigint,
#     displayName  text,
#     name         text,
#     gender       text,
#     class_       text,
#     club         text,
#     bib          int,
#     age          text,
#     ranking      int,
#     time_        date,
#     alt          int   
# );
