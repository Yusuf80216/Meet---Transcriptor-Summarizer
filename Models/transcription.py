import os
import pyannote.audio
import whisper
import datetime
import subprocess
import torch
from pyannote.audio.pipelines.speaker_verification import PretrainedSpeakerEmbedding
from pyannote.audio import Audio
from pyannote.core import Segment
import wave
import contextlib
from sklearn.cluster import AgglomerativeClustering
import numpy as np
from pydub import AudioSegment
from googletrans import Translator
from pyngrok import ngrok
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from moviepy.editor import *
import time
import filetype
import cv2
import re
import pandas as pd
import locale


newpath = r'temp'
if not os.path.exists(newpath):
    os.makedirs(newpath)
newpath = r'transcript'
if not os.path.exists(newpath):
    os.makedirs(newpath)
newpath = r'segments'
if not os.path.exists(newpath):
    os.makedirs(newpath)


translator = Translator()
embedding_model = PretrainedSpeakerEmbedding("speechbrain/spkrec-ecapa-voxceleb", device=torch.device("cuda")) 
# If you have GPU enabled cuda, leave as it is, otherwise set torch.device to "CPU"

def getpreferredencoding(do_setlocale = True):
    return "UTF-8"
locale.getpreferredencoding = getpreferredencoding


language = 'English' #@param ['any', 'English']

model_size = 'large' #@param ['tiny', 'base', 'small', 'medium', 'large']

model_name = model_size
if language != 'English' and model_size == 'large':
    model_name += '.en'


print("MODEL LOADING INITIATED.....!!!!")

model = whisper.load_model(model_size)

print("MODEL LOADED.....!!!!")


port_no = 5000

from flask import Flask, request, jsonify, send_file
import re
import pandas as pd

app = Flask(__name__)
CORS(app)
ngrok.set_auth_token("")   # ---> Add your Auth token string from this link - [https://dashboard.ngrok.com/get-started/your-authtoken]
public_url = ngrok.connect(port_no).public_url

translator = Translator()

@app.route("/video", methods=['POST','OPTIONS'])
def transcription():

    print("_____WAITING FOR FILE_____")

    # Check if the POST request contains a file
    if 'file' not in request.files:
        return jsonify({'error': 'No file included in the request'}), 400

    print("_____FILE RECIEVED!!!_____")

    file = request.files['file']

    print(file)

    file_type = filetype.guess_mime(file)

    print(file_type)

    if 'video' in file_type:
        file.save('temp/' + 'RECORDING.mp4')
    elif 'audio' in file_type:
        file.save('temp/' + 'recording.wav')
    else:
        return 'Invalid file type'

    # file.save('temp/' + 'RECORDING.mp4')

    print("_____FILE SAVED!_____")

#============================================================================================================


#-----------------------------------------------------------------------------------------------------------------

    if 'video' in file_type:

        #CODE FOR TAKING VIDEO AS INPUT THEN CONVERTING IT TO AUDIO

        clip = VideoFileClip('temp/RECORDING.mp4')

        # Extract the audio from the video
        audio = clip.audio

        # Save the audio as a separate file
        audio.write_audiofile('temp/recording.wav')

#-----------------------------------------------------------------------------------------------------------------

# CODE TO GET THE DURATION OF MEET RECORDING

#-----------------------------------------------------------------------------------------------------------------

    audio_file_path = 'temp/recording.wav'
    with wave.open(audio_file_path, "rb") as wave_file:
        frame_rate = wave_file.getframerate()
        num_frames = wave_file.getnframes()
        duration = num_frames / float(frame_rate)
        # return duration
    hours = duration // 3600
    minutes = (duration % 3600) // 60
    seconds = duration % 60
    meeting_duration = f"{'0' + str(int(hours)) if hours < 10 else str(int(hours))}:{'0' + str(int(minutes)) if minutes < 10 else str(int(minutes))}:{'0' + str(int(seconds)) if seconds < 10 else str(int(seconds))}"
    print(f"THE DURATION OF MEETING IS-----> {meeting_duration}")

# #-----------------------------------------------------------------------------------------------------------------


    # for i in range(0, count):
    path = f"temp/recording.wav"

    if path[-3:] != 'wav':
        subprocess.call(['ffmpeg', '-i', path, 'recording.wav', '-y'])
        path = 'recording.wav'

    print("TRANSCRIPTION STARTED......!!!")

    # result = model.transcribe(path, task='translate')
    result = model.transcribe(path)

    print("TRANSCRIPTION DONE......!!!")

    segments = result["segments"]

    current_language = result["language"]


    with contextlib.closing(wave.open(path,'r')) as f:
        frames = f.getnframes()
        rate = f.getframerate()
        duration = frames / float(rate)

    print("GOT FRAMES AND RATE.....!!!")

    audio = Audio()

    def segment_embedding(segment):
        start = segment["start"]
        end = min(duration, segment["end"])
        clip = Segment(start, end)
        waveform, sample_rate = audio.crop(path, clip)
        return embedding_model(waveform[None])

    print("SEGMENT_EMBEDDING FUNCTION DEFINED......!!!")


    embeddings = np.zeros(shape=(len(segments), 192))
    for i, segment in enumerate(segments):
        embeddings[i] = segment_embedding(segment)

    embeddings = np.nan_to_num(embeddings)
    print(embedding_model)

    print("SEGMENT_EMBEDDING DONE BROOOO......!!!")


    clustering = AgglomerativeClustering().fit(embeddings)
    labels = clustering.labels_
    for i in range(len(segments)):
        segments[i]["speaker"] = 'SPEAKER ' + str(labels[i] + 1)
    print(segments)


    print("AGGLOMERATIVE CLUSTERING DONE SHEEEEEESSHHH.......!!!!!!")


    def time(secs):
        return datetime.timedelta(seconds=round(secs))

    print("TIME FETCHED YAAARRR......!!!!")

    f = open(f"transcript/transcript_FINAL.txt", "w")

    print("TRANSCRIPT FILE CREATED......!!!!")


    for (i, segment) in enumerate(segments):
        if i == 0 or segments[i - 1]["speaker"] != segment["speaker"]:
            f.write('\n' + segment["speaker"] + ' ' + str(time(segment["start"])) + '\n')
            print('\n' + str(time(segment["start"])) + '\n')
        try:
            f.write(segment["text"][1:])
            print(segment["text"][1:] + ' ')
        except:
            print("MASK")

    print("WRITING IN TRANSCRIPT FILE DONE!!! HURRAYYY!!......!!!!")

    f.close()




    def translated_transcript():

        total_segments = 0
        for i in result['segments']:
            total_segments = total_segments + 1
        print(total_segments)

        for i in range(0, total_segments):
            print(result['segments'][i]['text'])

            text_to_translate = result['segments'][i]['text']

            result['segments'][i]['text'] = translator.translate(text_to_translate, src = current_language, dest='en').text
            i = i+1
        print(result)


        f = open(f"transcript/translated_transcript_FINAL.txt", "w")

        print("TRANSCRIPT FILE CREATED......!!!!")


        for (i, segment) in enumerate(segments):
            if i == 0 or segments[i - 1]["speaker"] != segment["speaker"]:
                f.write('\n' + segment["speaker"] + ' ' + str(time(segment["start"])) + '\n')
                # f.write('\n' + str(time(segment["start"])) + '\n')
                print('\n' + str(time(segment["start"])) + '\n')
            try:
                f.write(segment["text"][0:])
                print(segment["text"][0:] + ' ')
            except:
                print("MASK")

        print("WRITING IN TRANSCRIPT FILE DONE!!! HURRAYYY!!......!!!!")

        f.close()

    translated_transcript()


#=============================================================================================================

    c_time = os.path.getmtime("transcript/transcript_FINAL.txt")
    creation_date = datetime.datetime.fromtimestamp(c_time).strftime('%Y-%m-%d')
    creation_time = datetime.datetime.fromtimestamp(c_time).strftime('%H:%M:%S')
    filename = 'transcript/transcript_FINAL.txt'

    #===================================================================================================================================

    def preprocess(filepath):
        sentences=[]
        namep="SPEAKER\s\d*"
        fi = open(filepath, "r", encoding="utf8")
        for f in fi:
          sentences.append(f.strip())
        sentences
        
        final = []
        for i in range(len(sentences)-1):
          if i%2 != 0 :
            name = str(sentences[i])
            strings = sentences[i+1]
            # name = name[2:-2]


            final.append(name+": "+ strings )



        return final




    def dialogue(filepath):
        fin=[]
        dic = {}
        preprocess(filepath)
        f = preprocess(filepath)
        print(f[1])
        lens = len(f)
        p_s = "SPEAKER\s\d*"
        p_t = "\d*:\d*:\d*"
        for i in range(lens):
          match = re.search( p_s, f[i])
          if match != None:
              name = match[0]
          match = re.search( p_t, f[i])
          if match != None:
              time = match[0]

          text = f[i].split(':')[3]

          dic = {"id": i ,"speaker":name,"time":time, "dialogue": text}
          fin.append(dic)


        return fin


    def noofspeaker(filepath):
        sentence=[]
        speaker = []
        namep="SPEAKER\s\d*"
        fi = open(filepath, "r", encoding="utf8")
        for f in fi:
          sentence.append(f.strip())
        sentence
        l= len(sentence)
        for i in range(1,l):
          if i%2 != 0:
            x = re.findall(namep,sentence[i])
            speaker.append(x)
        # print(speaker)
        df = pd.DataFrame(speaker , columns =['speakers'])
        # print(df)
        value = df['speakers'].nunique()
        print(value)
        return value

    #===================================================================================================================================
    no_of_speakers = noofspeaker("/content/transcript/transcript_FINAL.txt")

    o = dialogue("/content/transcript/transcript_FINAL.txt")
    e = dialogue("/content/transcript/translated_transcript_FINAL.txt")
    di = {"no_of_speakers": no_of_speakers,
          "user_language": { "speaker" : o},
          "english": { "speaker" : e},
          "user_language_code": current_language,
          "meeting_duration": meeting_duration,
          "created_time": creation_time,
          "created_date": creation_date
          }
    
    return di




@app.route("/transcript", methods=['GET'])
def text_file():
  filename = 'transcript/transcript_FINAL.txt'
  return send_file(filename, as_attachment=True), 200

print(f"To access the Gloable link please click {public_url}")
app.run(port=port_no)
