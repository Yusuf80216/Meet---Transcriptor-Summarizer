import React, { useEffect, useRef, useState } from 'react'
import {MdCloudUpload , MdDelete} from 'react-icons/md'
import {AiFillFile, AiFillFileImage} from 'react-icons/ai'
import {FiUser} from 'react-icons/fi'
import SummaryPage from '../pages/SummaryPage';
import { Navigate, useNavigate } from 'react-router';
import {BsFillFileEarmarkTextFill, BsUpload} from 'react-icons/bs'
import img from '../assets/menu.png'
import macicon from '../assets/close-minimiz-max.webp'
import axios from 'axios'
const Uploader = () => {

    const [isData, setIsData] = useState(false);
    const [placeholder,setPlaceholder] = useState(false)
    const [uploadSelect , setUploadSelect] = useState(true)
    const videoRef = useRef(null);
    const navigate = useNavigate();

    const [download,setDownload] = useState(null)
    const [change , setChange] = useState(false);

    const [image ,setImage ] = useState(null);
    const [fileName , setFileName] = useState('No selected File')
    // Redirect part :
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         navigate('/summarypage')
    //     },3000)
    // },[transcriptTextbar])


    // API Calls starts here;
    const [videoFile, setVideoFile] = useState(null);
    const [apiData,setApiData] = useState('Your Transcript will appear here.');
    const [loading,setLoading]= useState(false);
    
    // download transcript from React:
    const downloadTranscriptFunction=(e)=>{
        e.preventDefault();
        var res = "Thank you so much for being here. Google Developer Student Clubs presents the third session of the Solution Challenge. Welcome, everyone, to UX ";
        var data   = new Blob([res], {type: 'text/txt'}),
        textURL = window.URL.createObjectURL(data),
        tempLink = document.createElement('a');
        tempLink.href = textURL;
        tempLink.setAttribute('download','Transcript.txt');
        tempLink.click();
    }
    const downloadTranscript= async(e)=>{
        e.preventDefault();
        setDownload()
        // const formData = new FormData();
        // formData.append("file", videoFile);
        // try {
        //     const response = await axios.get("http://1990-34-91-242-141.ngrok.io/transcript", formData);
        // } catch (error) {
        //     console.error(error);
        // }
    }
    const handleFileChange = (event) => {
        event.preventDefault();
        setVideoFile(event.target.files[0]);
        setUploadSelect(false);
        setImage(URL.createObjectURL(event.target.files[0]))
    };
    console.log('VIDEOFILE:',videoFile);
    const handleFormats=(event)=>{
        event.preventDefault();
        document.querySelector('.input-field').click()
        
    }
    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("file", videoFile);
        try {
            const response = await axios.post("http://9e52-34-86-191-32.ngrok.io/video", formData);
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
    return (
    <>
        {/* Border Layouts */}
            <div className='w-[420px] md:w-[1350px] h-[900px] border_all_radius bg-[#171616] rounded-lg mb-10'>
                <div className='h-[51px] lg:h-[71px] border_only_bottom flex justify-end pr-4 items-center transition-all'>
                    <button onClick={handleUpload} className=' text-[#4E4242] bg-none border_all_radius hover:bg-[#d4d1d1] transition-all px-5 py-3  relative z-[10] rounded-md font_paragraph_regular' >Generate</button>
                </div>
                <div className='text-white h-[51px] lg:h-[810px] flex flex-col lg:flex-row rounded-lg font_paragraph_regular'>
                    <div className='h-[50%] lg:h-full lg:w-[793px] rounded-none'>
                        <div className='flex flex-col justify-center items-center h-full text-[#4E4242] gap-4 cursor-default'>
                            <h1>No Files has been Selected</h1>
                            <form action="">
                                <input type="file" name="file" id="file" className='input-field border_bottom' hidden
                                    onChange={handleFileChange}
                                />
                                <button onClick={handleFormats} type='submit' className='px-5 py-3 border_all_diff rounded-md'>Upload</button>
                                <button onClick={downloadTranscriptFunction} type='submit' className='ml-2 px-5 py-3 border_all_diff rounded-md'>Download</button>
                            </form>
                        </div>
                    </div>
                    <div className='h-[50%] lg:h-full w-full border_only_right rounded-none p-4 text-[#756a6a] '>
                        <h1 className='mt-10 font_title_bold w-fit text-white text-4xl'>Transcript</h1>
                        {
                            placeholder ? (
                                <div className='border_all_radius h-[45rem] p-6 flex flex-col text-left gap-4 overflow-y-scroll bg-[#f3f3f3]'>
                                { 
                                    isData ? (
                                        apiData.user_language.speaker.map((curElem)=>{
                                            
                                            return(
                                                <>
                                                    <div className='flex gap-4'>
                                                        <div className='flex gap-2 items-center'>
                                                            <FiUser className='px-1 rounded-full bg-gray-300'/>
                                                            <h1 className='text-[#292828]'>{curElem.speaker}</h1>
                                                        </div>
                                                        <h1 className='text-[#292828]'>{curElem.time}</h1>
                                                    </div>
                                                    <div className=''>
                                                        <p>{curElem.dialogue}</p>
                                                    </div>
                                                </>
                                            )
                                        })
                                    ):(
                                        null
                                    )
                                }
                                </div>
                            ) :(
                                <div className='flex flex-col justify-center items-center h-full'>
                                    <h1>'Transcript will appear here.'</h1>
                                </div>
                            )
                        } 
                            
                        {/* {
                            placeholder ? (
                                <div className='border_all_radius h-[45rem] p-6 flex flex-col text-left gap-4 overflow-y-scroll bg-[#f3f3f3]'>
                                { 
                                    isData ? (
                                        apiData.speaker.map((curElem)=>{
                                            
                                            return(
                                                <>
                                                    <div className='flex gap-4'>
                                                        <div className='flex gap-2 items-center'>
                                                            <FiUser className='px-1 rounded-full bg-gray-300'/>
                                                            <h1 className='text-[#292828]'>{curElem.speaker}</h1>
                                                        </div>
                                                        <h1 className='text-[#292828]'>{curElem.time}</h1>
                                                    </div>
                                                    <div className=''>
                                                        <p>{curElem.dialogue}</p>
                                                    </div>
                                                </>
                                            )
                                        })
                                    ):(
                                        null
                                    )
                                }
                                </div>
                            ) :(
                                <div className='flex flex-col justify-center items-center h-full'>
                                    <h1>'Transcript will appear here.'</h1>
                                </div>
                            )
                        } 
                             */}
                    </div>
                </div>
            </div>
    </>
  )
}

export default Uploader