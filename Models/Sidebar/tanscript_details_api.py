import string

def remove_punctuation_except(text, exceptions):
    """
    This function removes all punctuation marks from a given text, except for a specified set of characters.
    """
    translator = str.maketrans('', '', string.punctuation.replace(exceptions, ''))
    return text.translate(translator)


import re

def readfile(filename):
  translator = Translator()
  file = open(filename, "r")
  sentence = []
  finalsum = ""

  for f in file:
    if f == '\n':
      continue
    else:
      f = remove_punctuation_except(f, ':')
      for i in f :
        if i  == "\n" or i == "\\" :
          f = f.replace('\\',"")
          f= f.replace('\n',"")
      # print("f",f)
      # print(final)
      sentence.append(f + ".")

  lan = translator.detect(str(sentence[0]))
  lang_code = lan.lang
  # language = LANGUAGES[lang_code]
  file.close()
  return lang_code,sentence

def noofspeaker(sentences):
  names = []
  speaker = []
  namep="SPEAKER\s\d*"
  x = re.findall(namep,sentences[0])
  print(x)
  if len(x) == 0  :
    for i in range(len(sentences)):
      name = sentences[i].split(':')[0].strip()
      names.append(name)
  else:
    for i in range(len(sentences)):
        # print("sentence = ",sentences[i])
        x = re.findall(namep,sentences[i])
        # print(x)
        if str(x) != '[]':
          names.append(str(x))
  # print(names)
  sets = set(names)
  print(sets)
  nameslist = list(sets)
  num = len(nameslist)
  return num



from flask import Flask,request,abort
from pyngrok import ngrok
import os
import re
import json
from flask import jsonify
from flask_cors import CORS
import time
import datetime
import filetype
from googletrans import Translator
import boto3,uuid


os.mkdir("uploads")

def translation( target_language,sentences):
    translator = Translator()

    target_language = target_language
    result = []
    if type(sentences) == str:
      sentences = sentences.split("\n")
    # total_segments = 0
    # for i in result['segments']:
    #     total_segments = total_segments + 1
    # print(total_segments)
    for i in range(len(sentences)):
        text_to_translate = sentences[i]
        target_sentence = translator.translate(text_to_translate, src ='en', dest=target_language).text
        result.append(target_sentence)
    return result


ALLOWED_EXTENSIONS = {'txt'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

import boto3
import uuid
s3 = boto3.resource(
    service_name = 's3',
    region_name='us-east-2',
    aws_access_key_id ='ACESS_KEY',
    aws_secret_access_key='SECRET_ACCESS_KEY'
)

def transcript(sentence,noofspeaker):
  namep="SPEAKER\s\d*"
  timestamp = "\d*:\d*:\d*"
  names = "[A-Za-z]*\s*:"
  namenp = "[A-Za-z]*:"
  new = []
  l= len(sentence)
  x = re.findall(namep,sentence[0])
  print("sentence = ",sentence[0])
  print("first x",x)
  lists = []
  if len(x) == 0:
        y = re.findall(names,sentence[0])
        z = re.findall(namenp,sentence[0])
        if len(y)!=0 or len(z)!= 0 :
          for i in range(len(sentence)):
            print("y"*30)
            print(sentence[i])
            y = re.findall(names,sentence[i])
            z = re.findall(namenp,sentence[i])
            t = re.findall(timestamp,sentence[i])
            if len(y) != 0:
              name = str(y)[2:-2]
            else:
              name = str(z)[2:-2]
            if len(t) == 0 :
              t =""
            text = sentence[i].split(':')[-1]
            print("text 0 is",text[1])
            if len(re.findall('[A-za-z]',text[1])) != 0:
                    dic = {"speaker":name,"time":str(t)[2:-2],"dialogue":text }
                    lists.append(dic)


            else:
              for i in range(0,l - 1):
                  if i%2 == 0:
                    print("sentence in preprocess = ",sentence[i])
                    y = re.findall(names,sentence[i])
                    z = re.findall(namenp,sentence[i])
                    t = re.findall(timestamp,sentence[i])
                    if len(y) != 0:
                      name = str(y)[2:-2]
                    else:
                      name = str(z)[2:-2]
                    if len(t) == 0 :
                      t =""
                    text = sentence[i+1]
                    dic = {"speaker":name,"time":str(t)[2:-2],"dialogue":text }
                    lists.append(dic)




  else:
      for i in range(0,l - 1):
         if i%2 == 0:
           print("sentence in preprocess = ",sentence[i])
           y = re.findall(namep,sentence[i])
           t = re.findall(timestamp,sentence[i])
           if len(y) != 0:
                      name = str(y)[2:-2]
           text = sentence[i+1]
           dic = {"speaker":name,"time":str(t)[2:-2],"dialogue":text }
           lists.append(dic)
  return lists



def remove_punctuation_except(text, exceptions):
    """
    This function removes all punctuation marks from a given text, except for a specified set of characters.
    """
    translator = str.maketrans('', '', string.punctuation.replace(exceptions, ''))
    return text.translate(translator)


def translation( target_language,sentences):
    translator = Translator()

    target_language = target_language
    result = []
    if type(sentences) == str:
      sentences = sentences.split("\n")
    # total_segments = 0
    # for i in result['segments']:
    #     total_segments = total_segments + 1
    # print(total_segments)
    for i in range(len(sentences)):
        text_to_translate = sentences[i]
        target_sentence = translator.translate(text_to_translate, src ='en', dest=target_language).text
        result.append(target_sentence)
    return result

def readfile(filename):
  translator = Translator()
  file = filename.split('\n')
  print("o"*50)
  print(file)
  sentence = []
  finalsum = ""

  for f in file:
    if f == "\r":
        f= f.replace("\r","")

    elif f == "\n":
        f = f.replace("\r","")
    else:
      f = remove_punctuation_except(f, ':')


      for i in f :
        if i  == "\n" or i == "\\" or i == "\r" :
          f = f.replace('\\',"")
          f= f.replace('\n',"")
          f= f.replace('\r',"")
      # print("f",f)
      # print(final)
      if f != "":
        sentence.append((f + ".").strip())

  lan = translator.detect(str(sentence[0]))
  lang_code = lan.lang
  # language = LANGUAGES[lang_code]
#   file.close()
  return lang_code,sentence

def noofspeaker(sentences):
  names = []
  speaker = []
  namep="SPEAKER\s\d*"
  x = re.findall(namep,sentences[0])
  print(x)
  if len(x) == 0  :
    for i in range(len(sentences)):
      name = sentences[i].split(':')[0].strip()
      names.append(name)
  else:
    for i in range(len(sentences)):
        # print("sentence = ",sentences[i])
        x = re.findall(namep,sentences[i])
        # print(x)
        if str(x) != '[]':
          names.append(str(x))
  # print(names)
  sets = set(names)
  print(sets)
  nameslist = list(sets)
  num = len(nameslist)
  return num


app = Flask(__name__)
cors = CORS(app)
ngrok.set_auth_token("2Nvuiodzf44RE7mIAJP3jgDjVRf_Nhzb5yD8Zan8QABjHxT8")
public_url = ngrok.connect(5050).public_url
@app.route("/details", methods=["POST", "OPTIONS"])
def summary():
    if not request.files:
        print("BU=RUH")
        abort(400)
    file = request.files['file']
    new_filename = uuid.uuid4().hex + '.' + file.filename.rsplit('.', 1)[1].lower()
    bucket_name = "deepbluetranscript"
    s3_key = new_filename
    s3 = boto3.resource(
    service_name = 's3',
    region_name='us-east-2',
    aws_access_key_id ='AKIARFSHEEWZVMTD7F54',
    aws_secret_access_key='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'
    )
    s3.Bucket(bucket_name).upload_fileobj(file, new_filename)
    to_language = request.form['user_language']
    username = request.form['email']
    print(to_language , username)
    s31 = boto3.client(
    service_name = 's3',
    region_name='us-east-2',
    aws_access_key_id ='AKIARFSHEEWZVMTD7F54',
    aws_secret_access_key='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'
    )
    # file.save('uploads/' + 'transcript.txt')
    # filepath = 'uploads/transcript.txt'
    response = s31.get_object(Bucket=bucket_name, Key=s3_key)
    contents = response['Body'].read().decode('utf-8')
    print("contents",type(contents),contents)

    lan ,sentences = readfile(contents)

    print(sentences)
    num = noofspeaker(sentences)
    listofnames = transcript(sentences,num)
    print(num)
    senddic = {"language": lan , "no_of_speakers": num,"user_language":to_language,"email":username,"new_file":new_filename,'speakers':listofnames}
    return senddic

print(public_url)
app.run(port = 5050)

