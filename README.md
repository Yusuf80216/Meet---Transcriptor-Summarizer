# Virtual Meetings Summarizer
In the work from home scenario prevailing over the last 18 months and with hybrid working picking steam, most Official meetings have been or will be conducted virtually. While MICROSOFT TEAMS / Google Meet / Zoom do provide a feature to download TRANSCRIPT, it does not summarise the meeting.


#### Problem Dimensions :

- Parse the Transcript to figure out many attendees were there in the meeting.
- Duration of the meeting
- Most importantly produce a gist / summary of the meeting
- List the Action items if they are specifically called out.
- Incase where Transcript is not available, you will have to additionally work on converting SPEECH to TEXT

<br>
<hr>

## Website Installation :

```js
cd website
npm install
npm start
```
### Transcription Model :
To run transcription generator file:

```
cd Models/Transcription
pip install -r requirements.txt
python transcription.py
```
(PS: Before running this file, please check if you have CUDA and make necessary changes [line 40] & add your Auth Token String mentioned in the code [line 72])

### Fetch Summary :
To run Summary Fetcher file:

```
cd Retriever
pip install -r requirements.txt
python fetch_summaries.py
```

### API Endpoints
### The SummaryPage API provides the following endpoints:

```
/sidebar: Use this endpoint to generate items in the sidebar such as action items, talk time, speaker names, etc.
/details: To generate user details.
```



## Contributors

| Profile                                                  | Role |
| :------------------------------------------------------- | :------- |
| [Yusuf Ansari](https://github.com/Yusuf80216)           | ML/Backend Developer |
| [Vrushali Chaudhari](https://github.com/Vrushali-anil-Chaudhari)           | ML/Backend Developer |
| [Yash Kamble](https://github.com/yash-devop)           | Full Stack Developer |
| [Khushi Sharma](https://github.com/khushishar)           | Backend Developer |
