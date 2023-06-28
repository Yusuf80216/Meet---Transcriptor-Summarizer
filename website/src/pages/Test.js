import React, { useState } from "react";
import axios from "axios";
import { data } from "../data";
const Test = () => {
    const api = 

    // yusuf api 
    {
        'user_language': {
            'speakers':[
              {
                id:1,
                speaker: 'SPEAKER1',
                time: '0:01:55',
                dialogue: "DIALOGE1 dsad132" 
              },
              {
                id:2,
                speaker: 'SPEAKER2',
                time: '0:11:55',
                dialoge: "DIALOGE2 hhuiad" 
              },
              {
                id:3,
                speaker: 'SPEAKER3',
                time: '0:53:55',
                dialoge: "DIALOGE3 sdadsadas" 
              },
          ]
        },
        'english': {
          'speakers':[
            {
              id:1,
              speaker: 'SPEAKER1',
              time: '0:01:55',
              dialogue: "DIALOGE1 dsad132" 
            },
            {
              id:2,
              speaker: 'SPEAKER2',
              time: '0:11:55',
              dialoge: "DIALOGE2 hhuiad" 
            },
            {
              id:3,
              speaker: 'SPEAKER3',
              time: '0:53:55',
              dialoge: "DIALOGE3 sdadsadas" 
            },
        ]
      },
      'user_language_code': 'hi',
    }


  
    // vrushali api
    const api2 = 
    {
      'keywords':[
          {
              id:0,
              data: 'ux challenge',
          },
          {
              id:1,
              data : 'speaker evening renowned',
          },
          {   id:2,
              data: 'design speaker thank ishita',
          },
      ],
      num_speaker:2,
      talktime:[
          {
              speaker: 'SPEAKER 1',
              value : '49.543432',
          },
          {
              speaker: 'SPEAKER 2',
              value : '63.543432',
          },
          {
              speaker: 'SPEAKER 3',
              value : '12.543432',
          },
      ]
    }





    // yusuf api call handling
    const [videoFile, setVideoFile] = useState(null);
    const [apiData,setApiData] = useState('');
    const handleFileChange = (event) => {
        setVideoFile(event.target.files[0]);
    };

    console.log('VIDEOFILE:',videoFile);
    
  //   const handleUpload = async () => {
  //   const formData = new FormData();
  //   formData.append("file", videoFile);
  //   try {
  //     const response = await axios.post("http://66ca-34-141-198-78.ngrok.io/video", formData);
  //     console.log(response.data);
  //     setApiData(response.data)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // console.log(apiData);
  //download the transcript.txt
  // const downloadTextFile = async () => {
  //   const formData = new FormData();
  //   formData.append("file", videoFile);
  //   try {
  //       const response = await axios.get("http://16cf-34-142-161-40.ngrok.io/transcript", formData);
  //       console.log(response.data);
  //     }catch (error) {
  //       console.error(error);
  //     }
  // };    
  return (
    <>
        <div className="text-black">
            <h1>Testinggggg</h1>
            <div className="bg-white">
                {/* <input type="file" name="file" onChange={handleFileChange} /> */}
                <button className='p-3 bg-red-400'>Upload</button>
                <div className="text-red-500 bg-white p-4 mx-3 border-2">
                    {/* {
                      api.speakers.map((curr)=>{
                        return(
                          <>
                            <div className="flex flex-col">
                                <div className="p-4 border w-56">
                                    {curr.speaker} {curr.time}
                                    {curr.dialoge}
                                </div>
                            </div>
                          </>
                        )
                      })
                    } */}
                    {/* {'Number of Speakers '}{api.num_speaker}
                    {
                      api.talktime.map((curr)=>{
                        return(
                          <div className="flex justify-between border w-56">
                              {curr.speaker}{' '}
                              {curr.value}
                          </div>
                        )
                      })
                    } */}
                </div>
            </div>
        </div>
    </>
  )
}

export default Test