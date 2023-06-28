from flask import Flask, request
from pydub import AudioSegment
import os
# import ffmpeg

app = Flask(__name__)

@app.route('/upload-audio', methods=['POST'])
def upload_file():
    file = request.files['file']
    file.save('temp.wav')  # save to a temporary location
    
    audio_segment = AudioSegment.from_file('temp.wav', format='wav')
    duration = audio_segment.duration_seconds
    chunk_duration = 15  # seconds
    
    for i in range(0, int(duration), chunk_duration):
        start = i * 1000  # milliseconds
        end = (i + chunk_duration) * 1000  # milliseconds
        chunk = audio_segment[start:end]
        chunk.export(f'chunk_{i}.wav', format='wav')
    
    os.remove('temp.wav')  # delete the temporary file
    
    return 'OK'

if __name__ == '__main__':
 
    # run() method of Flask class runs the application
    # on the local development server.
    app.run()