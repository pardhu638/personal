import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(dotenv_path="./.env.local")

MONGO_URL= os.environ.get("MONGO_URL", "mongo")
MONGO_USERNAME = os.environ.get("MONGO_USERNAME", "root")
MONGO_PASSWORD = os.environ.get("MONGO_PASSWORD", "")
MONGO_PORT = os.environ.get("MONGO_PORT", 27017)

mongo_client = MongoClient(

    host     = MONGO_URL,
    username = MONGO_USERNAME,
    password = MONGO_PASSWORD,
    port     = MONGO_PORT
)

def insert_document():
    db = mongo_client.test
    test_collections = db.test_collections
    res = test_collections.insert_one({"name":"pardhu Ravipati","employee": True})
    print(res)