from crypt import methods
from flask import Flask, request ,jsonify
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client

load_dotenv(dotenv_path="./.env.local")
UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = os.environ.get("DEBUG", True)

gallery = mongo_client.gallery
images_collection = gallery.images

app = Flask(__name__)
CORS(app)
app.config["DEBUG"] = bool(DEBUG)

@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {"Authorization": "Client-ID " + UNSPLASH_KEY, "Accept-Version": "v1"}
    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = response.json()
    return data
@app.route("/images", methods=["GET","POST"])
def images():
    if request.method == "GET":
        # read images from the db
        images = images_collection.find({})
        return jsonify([img for img in images])
    if request.method == "POST":
        # save images to the db
       image = request.get_json()
       image["_id"] = image.get("id")
       result = images_collection.insert_one(image)
       inserted_id = result.inserted_id
       return {"inserted_id": inserted_id}

@app.route("/images/<image_id>",methods=["DELETE"])
def image(image_id):
    # delete the image fron the db
    result = images_collection.delete_one({"_id":image_id})
    if not result:
        return {"error":"Image not delted. Please try again after sometime"} , 500
    if result and not result.deleted_count:
        return {"error":"Image not found"}, 404
    return {"image_id":image_id}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
