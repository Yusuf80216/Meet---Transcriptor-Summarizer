from flask import Flask, jsonify, request
from pymongo import MongoClient
from pyngrok import ngrok
from flask_cors import CORS
from bson.objectid import ObjectId

port_no = 5000
app = Flask(__name__)
CORS(app)
ngrok.set_auth_token("")   # ---> Add your Auth token string from this link - [https://dashboard.ngrok.com/get-started/your-authtoken]
public_url = ngrok.connect(port_no).public_url
client = MongoClient("")  # ---> Add your Mongo Client string link
db = client["summaries"]

@app.route('/fetch_summaries', methods=["POST","OPTIONS"])
def get_summaries():
    collection_name = request.form['email']

    collection = db[collection_name]

    document_ids = []
    document_ids = [str(id) for id in collection.distinct("_id")]

    all_summaries = []

    for individual_summary in range(0, len(document_ids)):
      obj_id = ObjectId(document_ids[individual_summary])
      document = collection.find_one({'_id': obj_id})
      title = document.get("subject")
      data = document.get("data")
      my_dic = {"title": title, "data": data}
      all_summaries.append(my_dic)

    return jsonify({"all_summaries": all_summaries})

print(f"To access the Gloable link please click {public_url}")
app.run(port=port_no)