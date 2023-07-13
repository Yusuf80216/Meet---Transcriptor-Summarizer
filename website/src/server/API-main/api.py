from flask import Flask, request, jsonify,abort
import pandas as pd
import whisper
import ffmpeg
import os
from tempfile import NamedTemporaryFile
model = whisper.load_model('medium')
# Your API definition
app = Flask(__name__)


@app.route('/test',methods=["GET"])
def helloworld():
   temp = []
   temp.append({'hello' :'I get accessed'})
   return jsonify(temp)

@app.route('/upload', methods=["POST"])
def predict():
  if not request.files:
      abort(400)

  results = []
  transcribed = []

  for filename,handle in request.files.items():
      temp = NamedTemporaryFile()
      handle.save(temp)
      result = model.transcribe(temp.name)
      results.append({
          'filename': filename,
          'transcript': result['text'],
      })
#   return {'results' : results}
  return jsonify({'results' : results})




if __name__ == '__main__':
   app.run(debug=True)

