import React, { useEffect, useRef, useState } from 'react'
import { Route, Router, Routes, useLocation, useNavigate } from "react-router";

import axios from "axios";
import Sidebar from '../components/Sidebar';
import userLogo from '../assets/user-pfp.jpg'
import { FiUser } from 'react-icons/fi';
import { IoIosArrowDown } from "react-icons/io";
import { AiFillFileImage } from "react-icons/ai";
import { MdCloudUpload, MdDelete, MdOutlineChat, MdOutlineFileDownload, MdOutlineFileDownloadOff } from 'react-icons/md';
// import video from '../assets/RECORDING.mp4'
import video from '../assets/testingvideo.mp4'
import Transcript from '../components/Transcript';
import { BiVideo } from 'react-icons/bi';
import { HiDownload } from 'react-icons/hi';
import Account from '../components/Account';
// import sitelogo from "../assets/Netflix_2015_logo.svg";
// import menu from "../assets/menu.png";
// import close from "../assets/close.png";
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar'
// import Uploader from '../components/Uploader'

const UploadPage = () => {
    const [showDropDown , setShowDropDown] = useState(false);
    const [uploadFile , setUploadFile] = useState(false);
//   const [inactive, setInactive] = useState(true);
//   const [mobileInactive, setMobileInactive] = useState(true);
//   const [mobileIsOpen, setMobileIsOpen] = useState(false);
//   const [on, setOn] = useState(false);
//   const [expand, setExpand] = useState(false);
  const [isData, setIsData] = useState(false);
  const [placeholder, setPlaceholder] = useState(false);
  const [uploadSelect, setUploadSelect] = useState(true);
  const [gridLayout,setGridLayout] = useState('transcript');
  const [isGridLayout , setIsGridLayout] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const imgRef = useRef();
  const menuRef = useRef();
  const dropDownData = ['Profile' ,'Checkout','My Account','Logout']

  window.addEventListener("click",(e)=>{
    console.log('Haa bhai', e.target === menuRef.current);
    //  if(e.target !== menuRef.current){
    //     setShowDropDown(false);
    //  }
  })
  const [download, setDownload] = useState(null);
  const [change, setChange] = useState(false);

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState(<h1 className='text-[#7465d5] text-sm'>No recording selected</h1>);
  const [videoFile, setVideoFile] = useState(null);
  const [apiData, setApiData] = useState("Your Transcript will appear here.");
  const [loading, setLoading] = useState(false);
 
  const handleDone =()=>{
    setLoading(true);
    setUploadFile(true);
    setLoading(false);
  }

  const goToSummary=()=>{
    const data = "YASHKAMBLE";
    navigate('/summary', { state: { data } });
  }
  const downloadTranscript = async (e) => {
    e.preventDefault();
    setDownload();
    // const formData = new FormData();
    // formData.append("file", videoFile);
    // try {
    //     const response = await axios.get("http://1990-34-91-242-141.ngrok.io/transcript", formData);
    // } catch (error) {
    //     console.error(error);
    // }
  };
  const handleFileChange = (event) => {
    event.preventDefault();
    setVideoFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
    setFileName(event.target.files[0].name)
  };
  console.log("VIDEOFILE:", videoFile);
  const handleFormats = (event) => {
    event.preventDefault();
    document.querySelector(".input-field").click();
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadFile(true);
    setIsGridLayout(true);
    setLoading(true);
    const formData = new FormData();
    formData.append("file", videoFile);
    try {
        const response = await axios.post("http://b555-34-68-104-182.ngrok.io/video", formData);
        //   console.log(response.data);
        let data = await response.data;
        console.log('DATA AAYA RE',data);
        setApiData(data)
        setIsData(true)
    } catch (error) {
        console.error(error);
    }
    setLoading(false)
    setPlaceholder(true)
};
console.log(isData);
console.log('APIDATA SE  ayaa huu : ',apiData);

 // download transcript from React:
 const downloadTranscriptFunction = (e) => {
  let newVar;
  e.preventDefault();
  let res = apiData ? (apiData.user_language.speaker.map((curelem)=>{
    return newVar = curelem.dialogue;
  })) : "";
  // let res = apiData ? apiData : "";
  // var res =
  //   "Thank you so much for being here. Google Developer Student Clubs presents the third session of the Solution Challenge. Welcome, everyone, to UX ";
  var data = new Blob([newVar], { type: "text/txt" }),
    textURL = window.URL.createObjectURL(data),
    tempLink = document.createElement("a");
    tempLink.href = textURL;
    tempLink.setAttribute("download", "Transcript.txt");
    tempLink.click();
};

// const speakersObj = {};
//     data.map((element,index)=>{
//       // console.log('eleemnet',element);
//       console.log('eleemnet',element.main);
//       speakersObj[`element${index+1}`] =  element.main;
//     })
//     console.log('speakerDATA',speakersObj);
  



  const api = 

    // yusuf api 
    {
        'user_language': {
            'speakers':[
              {
                id:1,
                speaker: 'Speaker 1',
                time: '0:01:55',
                dialogue: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur in suscipit repellat voluptatum, omnis odio quo. Deleniti eveniet impedit nam a laudantium quos officia rerum earum asperiores quaerat modi est tempora corporis repellat ipsa, dolorem, excepturi eos neque id hic sequi minima illum beatae! Debitis, placeat. Eius, enim. Ducimus suscipit quia quae eos, nobis explicabo." 
              },
              {
                id:2,
                speaker: 'Speaker 2',
                time: '0:11:55',
                dialogue: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur in suscipit repellat voluptatum, omnis odio quo. Deleniti eveniet impedit nam a laudantium quos officia rerum earum asperiores quaerat modi est tempora corporis repellat ipsa, dolorem, excepturi eos neque id hic sequi minima illum beatae! Debitis, placeat. Eius, enim. Ducimus suscipit quia quae eos, nobis explicabo." 
              },
              {
                id:3,
                speaker: 'Speaker 3',
                time: '0:53:55',
                dialogue: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur in suscipit repellat voluptatum, omnis odio quo. Deleniti eveniet impedit nam a laudantium quos officia rerum earum asperiores quaerat modi est tempora corporis repellat ipsa, dolorem, excepturi eos neque id hic sequi minima illum beatae! Debitis, placeat. Eius, enim. Ducimus suscipit quia quae eos, nobis explicabo." 
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
              dialogue: "DIALOGE2 hhuiad" 
            },
            {
              id:3,
              speaker: 'SPEAKER3',
              time: '0:53:55',
              dialogue: "DIALOGE3 sdadsadas" 
            },
        ]
      },
      'user_language_code': 'hi',
    }

  return (
    
    <>
    {/* bg-[#F2F3F7] */}
        <div className='flex md:flex-row flex-col w-full h-full bg-[#F2F3F7]'>
            <Sidebar/>
            {/* bg-[#F2F3F7] => greyish */}
            {/* bg-[#fdfdfd] => White */}
            <div className='grid-layout '>
                {/* header */}
                <div className='grid-header flex justify-between  bg-[#F2F3F7]'>
                    <div className='flex gap-2 items-center pt-4 pl-8'>
                        <MdOutlineChat className='text-2xl text-[#7465d5]'/>
                        <h1 className='text-2xl font-bold pl-2'>Transcript</h1>
                        {/* <button onClick={goToSummary} className='p-1.5 bg-blue-400 whitespace-nowrap'>Go to summary</button> */}
                    </div>
                    <div className='hidden md:flex justify-end items-center  w-full h-[70px] py-5  space-x-4 pr-4'>
                        <div className='flex items-center gap-2  relative'>
                            {/* <div className='flex gap-2 items-center pt-4'>
                                <MdOutlineChat className='text-3xl text-[#635BFF]'/>
                                <h1 className='text-3xl font-bold pl-2'>Transcript</h1>
                            </div> */}
                            <div>
                                <img src={userLogo} alt="" className='w-full h-full rounded-full cursor-default' />
                            </div>
                            <div className='flex items-center gap-2'>
                                <IoIosArrowDown size={20} className='text-[#adadad] cursor-pointer' onClick={()=>setShowDropDown(!showDropDown)}/>
                            </div>

                            {/* DropDown Profile */}
                            {
                                showDropDown ? (
                                    <>
                                      <Account/>
                                    </>
                                ) : null
                            }
                        </div>
                    </div>
                </div>

                {/* MainSection */}
                {
                  uploadFile ? (
                    <>
                      <div className={`${'transcript'}-grid-main`}>
                          <div className='border mx-8 my-2 rounded-lg  text-white'>
                              <video className='w-full h-full rounded-lg object-cover' controls >
                              {image ?
                                      <source src={image}/>
                                    : 
                                    <>
                                    <p>LOADING...</p>
                                    </>
                              }
                              </video>
                          </div>
                          <div className='grid-right-item mx-8 rounded-lg overflow-y-scroll overflow-hidden h-[220px] min-h-full attach_scrollbar pt-4 px-8 bg-white border'>
                              {
                                isData ? (
                                  <div className='flex justify-end w-full'>
                                    <MdOutlineFileDownload className='cursor-pointer w-[25px] h-[25px]' onClick={downloadTranscriptFunction} title='Download'/>
                                  </div>
                                ) : (
                                  <div className='flex justify-end w-full'>
                                      <MdOutlineFileDownloadOff className='cursor-pointer w-[25px] h-[25px]' title='Download'/>
                                  </div>
                                )
                              }
                              {/* <h1 onClick={downloadTranscriptFunction}>DOWNLOAD</h1> */}
                              <div className='grid-right-transcript pt-4'>
                              { 
                                    isData ? (
                                        apiData.user_language.speaker.map((curelem)=>{
                                          return <Transcript key={curelem.id} speaker={curelem.speaker} dialogue={curelem.dialogue} time={curelem.time}/>
                                        })

                                    ):(
                                        null
                                    )
                              }
                              </div>
                          </div>
                        </div>
                    </>
                  ) : (
                    <>
                    <div className={`${'upload'}-grid-main`}>
                        <div className='flex flex-col justify-center items-center h-full text-[#4E4242] gap-4 cursor-default w-full '>
                            <div className='bg-white rounded-lg w-[600px] min-h-[500px] flex flex-col items-center justify-center '>
                                <h1 className='text-left font-bold w-full pl-12 py-2'>Add recording</h1>
                                <form className='upload-form ' onClick={() => document.querySelector(".input-field").click()}>
                                  <input type="file" accept='.mp4' className='input-field' hidden onChange={handleFileChange}/>
                                  {image ?
                                  <video className='w-[350px] h-[350px]' muted>
                                    <source src={image}/>
                                  </video>
                                  : 
                                  <>
                                  <MdCloudUpload color='#7465d5' size={60} />
                                  <p>Browse Files to upload</p>
                                  </>
                                }
                                </form>

                                <section className='uploaded-row'>
                                  <BiVideo color='' />
                                  <span className='upload-content'>
                                    <h1 className='text-[#7465d5] text-sm'>{fileName}</h1> - 
                                    <MdDelete
                                    className='cursor-pointer '
                                    onClick={() => {
                                      setFileName(<h1 className='text-[#7465d5] text-sm'>No recording selected</h1>)
                                      setImage(null)
                                    }}
                                    />
                                  </span>
                                </section>
                                {
                                  image ? (
                                    <button onClick={handleUpload} className='w-[500px] p-4 mb-2 font-semibold rounded-lg bg-[#7465d5] hover:bg-[#7465d5]/70 text-white transition-all duration-150 ease-in'>Generate</button>
                                  ) : (
                                    <button onClick={handleUpload} disabled className='w-[500px] p-4 mb-2 font-semibold rounded-lg bg-[#5a5a5a] text-white transition-all duration-150 ease-in'>Generate</button>
                                  )
                                }
                                
                            </div>
                        </div> 
                      </div> 
                    </>
                  )
                }

                </div>
            </div>
    </>
  )

};

export default UploadPage;
