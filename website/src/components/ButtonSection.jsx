import { getDownloadURL, listAll, ref , uploadBytes } from 'firebase/storage';
import { redirect } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {storage} from '../config/firebaseapp'
import NextPage from '../NextPage';
import ImageViewer from './ImageViewer';
import { useNavigate } from 'react-router-dom';
const ButtonSection = () => {
    const navigate = useNavigate();
    // fileupload to storage
    const [fileupload , setFileUpload] = useState(null);
    const [listData , setListData ] = useState([]);
    const random = Math.random();
    const filesRef = ref(storage,`projectfiles/`)
    const uploadFile = async (e)=>{
        e.preventDefault()
        if(!fileupload) return;  // means if nothing is in the fileupload state , just simply return

        // creating folder in firebase/storage
        // here we are creating a folder projectfiles and then its filename
        const filesfolderRef = ref(storage ,`projectfiles/${fileupload.name+random}`);
        // here we are passsing folder and the file to uploadbytes(folder , file)
        try{
            await uploadBytes(filesfolderRef , fileupload)
        }catch(err){
            console.log('error',err);
        }
        
        
    }
    useEffect(()=>{
        listAll(filesRef).then((response)=>{
            response.items.forEach((item)=>{
                getDownloadURL(item).then((url)=>{
                    setListData((prev)=>[...prev , url])
                    console.log('URL DATA:' , url);
                })
            })
        }).catch((err)=>{
            console.log(err);
        })
        
    },[])
    // const goToLibrary =()=>{
    //     navigate('/images', { state: { myProp: listData } });
    // }
    console.log('LIST DATA :' , listData);
    return (
        <>
            <div className='flex justify-center items-center h-screen border'>
            <form action="" onSubmit={uploadFile}>
                <input type="file" name="" id="" onChange={(e)=>setFileUpload(e.target.files[0])} />
                <button type='submit' className='p-3 border bg-blue-500 text-white m-2'>Upload video</button>
                <button className='p-3 border bg-blue-500 text-white m-2' >Go to Library</button> 
                {/* onClick={goToLibrary} */}
            </form>
            {/* {
                listData.map((url)=>{
                    return(
                        <>
                            <video src={url} className='w-20'/>
                            <img src={url} alt="" />
                            <audio src={url}/>
                        </>
                    )
                })
            } */}
        </div>
    </>
  )
}

export default ButtonSection