from googletrans import Translator
import re
import pandas as pd
from transformers import pipeline


classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

def meeting_type(text,lan):
    
    candidate_labels = ['Business', 'General', 'Workshop']
    classifier(text, candidate_labels)

    meeting_type = classifier(text, candidate_labels)
    possible_type = max(meeting_type["scores"])
    index_of_type = meeting_type["scores"].index(possible_type)
    # print(f"The meeting type is:- {candidate_labels[index_of_type]}")

    type_of_meeting = candidate_labels[index_of_type]

    return translation(lan,type_of_meeting)

# meeting_type(text,'en')

def translation( target_language,sentences):
    translator = Translator()
  
    target_language = target_language
    result = ''
    if type(sentences) == str: 
      sentences = sentences.split("\n")
    for i in range(len(sentences)):   
        text_to_translate = sentences[i]
        target_sentence = translator.translate(text_to_translate, src ='en', dest=target_language).text
        result = result+" "+ target_sentence +" "
    return result



def preprocess(sentence,noofspeaker):  
  namep="SPEAKER\s\d*"
  # print("under preprocess",sentence)
  new = []
  l= len(sentence)

  x = re.findall(namep,sentence[0])
  
  if len(x) == 0:
     
        final = ""
        for i in range(len(sentence)):
          final = final + sentence[i] + "\n"
        return final
  else:
      for i in range(1,l):
         if i%2 == 0:
           print("sentence in preprocess = ",sentence[i])
           x = re.findall(namep,sentence[i])
     
           sentence[i]= x
      final = ""
      print("8"*20)
      print(sentence)
      for i in range(len(sentence) - 1):
        if i%2 == 0 :
          name = str(sentence[i])
          strings = sentence[i+1]
          name = name[2:-2]
          
        
          final= final + str(name) +":"+ strings 
          final = final + "\n"
    
      print("final is",final)
      return final


from flask import Flask,request,abort
from pyngrok import ngrok
import os
import re
import json 
from flask import jsonify
from keybert import KeyBERT
from sentence_transformers import SentenceTransformer
smodel = SentenceTransformer('sentence-transformers/all-mpnet-base-v2')
kw_model2 = KeyBERT(model= smodel)

def key(text,lan): 
    print("in keywords")
    doc = text
    keywords = kw_model2.extract_keywords(doc, keyphrase_ngram_range=(4,4), stop_words= 'english',use_maxsum=True, nr_candidates=20, top_n=5)
    # print(keywords)
    key = []
    for i in range(5):
      dic = {"value": translation(lan,keywords[i][0]) }
      key.append(dic)



    return key





def talktime(sentences,lan):
  # path = filename
  regex = 'SPEAKER\s\d*'
  reg = '[a-zA-Z]*\s*:'
  # file = open(path,"r")
  c=0
  count=0
  counts =0
  l=[]
  li = []
  ratio=[]
  d = {}
  print("sentence in talktime:",sentences )
  for f in range(len(sentences)):
      print("heyyyy:",type(sentences[f]))
      match = re.search(regex,str(sentences[f])) 
      print("f:",sentences[f])
      
      if match != None:
          print("hi in if",match.group(0),match)
          l.append(match.group(0))
      else:
        match = re.search(reg,sentences[f]) 
        if match != None:
            print("hi in else",match.group(0),match)
            l.append(match.group(0))
  



  df = pd.DataFrame(l , columns = ["sentence"])  
  for idx, name in enumerate(df['sentence'].value_counts().index.tolist()):
    print('Name :', translation(lan,name))
    print('Counts :', df['sentence'].value_counts()[idx])
    li.append([translation(lan,name),df['sentence'].value_counts()[idx]])



  print(li)
  for i in range(len(li)):
    counts =li[i][1] + counts
  
  for i in range(len(li)):
    dic = {"main": li[i][0] , "value": (li[i][1]/counts)*100}
    ratio.append(dic)
  # d = defaultdict(list)
  # for k, v in ratio:
  #   d[k].append(v) 
  
  r = ratio
  return r



from flask_cors import CORS

def remove_punctuation_except(text, exceptions):
    translator = str.maketrans('', '', string.punctuation.replace(exceptions, ''))
    return text.translate(translator)

def transtoeng(filepath):
  sentence = []
    # realname = "[a-zA-Z]*\s*\d"
  file = filepath.split('\n')
  print(file)
  sentence = []
  finalsum = ""

  for f in file:
    # print("f is",f)
    f= f.replace("\r","")   
    f = remove_punctuation_except(f, ':')        
    for i in f : 
        if i  == "\n" or i == "\\" or i == "\r" :
          f = f.replace('\\',"")
          f= f.replace('\n',"")
          f= f.replace('\r',"")
          
      # print("f",f)
      # print(final)
    sentence.append(translation('en',str(f)+".").strip())
  # for f in fi:
  #   sentence.append(translation('en',f.strip()))
  
  if sentence[0].strip() == '.':
      del sentence[0]
  print('sentece first is',sentence[0],"type is", type(sentence[0]))
  return sentence



# filepath = '/content/transcript (2).txt'




import boto3
import uuid

import string

app = Flask(__name__)
cors = CORS(app)
ngrok.set_auth_token("")   # ---> Add your Auth token string from this link - [https://dashboard.ngrok.com/get-started/your-authtoken]
public_url = ngrok.connect(5050).public_url
@app.route("/sidebar", methods=["POST","OPTIONS"])
def summary():
    if not request.files:
        print("BU=RUH")
        abort(400)
    data =  request.form['data']
    data =  json.loads(data)
    print(type(data))
    print(data)
    sentence = []
    noofspeaker = data['no_of_speakers']
    lan = data['user_language']
    # file = data['old_file']
    new_filename = data['new_file']
    bucket_name = "deepbluetranscript"
    s3_key = new_filename
    s31 = boto3.client(
    service_name = 's3',
    region_name='us-east-2',
    aws_access_key_id ='',  #add you key id
    aws_secret_access_key=''  #add your secret access key
    )
  
    response = s31.get_object(Bucket=bucket_name, Key=s3_key)
    contents = response['Body'].read().decode('utf-8')
    print(type(contents),contents)
    print(data)
    sentence = transtoeng(contents)
    print("variable sentence",sentence)
    text = preprocess(sentence,noofspeaker)
    print("text",text)
    k = key(text,lan)
    types = meeting_type(text,lan) 
    t= talktime(sentence,lan)
    print(noofspeaker)
    print(k)
    di = {"num_speaker": noofspeaker,"keywords": k,"talktime":t ,"type": types}
    typess = {'id':1 , 'title':'Type','data':{'content':[{'value':types}]}}
    no = {'id':2 , 'title':'Speakers','data':{'content':[{'value':noofspeaker}]}}
    talk = {'id':3 , 'title':'Talktime','data':{'content':t}}
    keywords = {'id':4 , 'title':'Keywords','data':{'content':k}}
    
    # date = {'id':5 , 'title':'Date','data':{'content':dates}}
    # times = {'id':6 , 'title':'Time','data':{'content':time}}
    senddic = {"datacontent" : [typess , no, talk , keywords],"new_filename":new_filename}
    print(senddic)
    return senddic

print(public_url)
app.run(port = 5050)