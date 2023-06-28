import React, { useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const Accordion = ({title,type,speakers,keywords,talktime,data}) => {
  const [filterdata ,setFilterData ] = useState(null);
  const speakersObj = {};
  const [show , setShow] = useState(true);
  const [value, setValue] = useState('Speaker1');
  const [isEditable, setIsEditable] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const handleShow=()=>{
    setShow(!show);
  }
  
  console.log('dataofAccordion',data);
  if(data){
    setFilterData(data);
  }
  const handleDoubleClick = () => {
    setTempValue(value);
    setIsEditable(true);
  };

  const handleSave = () => {
    setValue(tempValue);
    setIsEditable(false);
  };

  const handleCancel = () => {
    setIsEditable(false);
    setTempValue(value);
  };

  const handleTempValueChange = (event) => {
    setTempValue(event.target.value);
  };
  // LATER ON:
  
  // let curElem;
  //   data.map((element,index)=>{
  //     console.log('eleemnet',element.main);
  //     speakersObj[`speaker${index+1}`] =  element.main;
  //   })



  //   console.log('speakerDATA',speakersObj);


  //   console.log('speaker1111',speakersObj.speaker1);
  


  return (
    <>
        {
            <>
                <div className='p-3 pl-5 accordion-border flex text-left items-center justify-between cursor-pointer' onClick={handleShow}>
                    <h1 className='text-[#575757] text-base'>{title}</h1>
                    {
                        show ? (
                          <>
                              <BsChevronUp className='w-[14px] h-[14px]'/>
                          </>
                        ):(
                            <BsChevronDown className='w-[14px] h-[14px]'/>
                        )
                    }
                    
                </div>
                {
                    show ? (
                      <>
                        <div className='p-3 pl-5 flex flex-col justify-between w-full gap-2 '>
                            {
                              filterdata.map((curelem)=>{
                                  return(
                                    <>
                                      {
                                        title === 'Talktime'? (
                                          <>
                                              <div className='flex  bg-blue-200 tracking-wider text-[#6775F3] p-1.5 px-3 rounded-lg bg-opacity-30 w-full text-base'>
                                                <input type="text" name="speaker" className='h-fit w-full bg-white' onChange={handleTempValueChange}/>
                                                {/* <input type="text" name="speaker" value={curelem.main} className='h-fit w-full bg-white' onChange={handleTempValueChange}/> */}
                                                <button className="px-2">X</button>
                                                <button className="px-2">ok</button>
                                                <p>{curelem.value}</p>
                                              </div>
                                          </>
                                        ) : (
                                          <>
                                            <div className='flex justify-between bg-blue-200 tracking-wider text-[#6775F3] p-1.5 rounded-lg bg-opacity-30 w-fit text-base'>
                                                {/* <p>{curelem.main}</p> */}
                                                <p>{curelem.value}</p>
                                            </div>
                                          </>
                                        )
                                          

                                      }
                                      
                                    </>
                                  )
                                })
                            }
                            {/* {
                                data.map((curelem)=>{
                                  return(
                                    <>
                                      {
                                        title === 'Talktime'? (
                                          <>
                                              <div className='flex  bg-blue-200 tracking-wider text-[#6775F3] p-1.5 px-3 rounded-lg bg-opacity-30 w-full text-base'>
                                                <input type="text" name="speaker" value={curelem.main} className='h-fit w-full bg-white' onChange={handleTempValueChange}/>
                                                <button className="px-2">X</button>
                                                <button className="px-2">ok</button>
                                                <p>{curelem.value}</p>
                                              </div>
                                          </>
                                        ) : (
                                          <>
                                            <div className='flex justify-between bg-blue-200 tracking-wider text-[#6775F3] p-1.5 rounded-lg bg-opacity-30 w-fit text-base'>
                                                <p>{curelem.main}</p>
                                                <p>{curelem.value}</p>
                                            </div>
                                          </>
                                        )
                                          

                                      }
                                      
                                    </>
                                  )
                                })
                            } */}
                                    {/* <>
                                    {
                                       title === 'Talktime' ? (
                                          <div className='flex justify-between bg-blue-200 tracking-wider text-[#6775F3] p-1.5 px-3 rounded-lg bg-opacity-30 w-full text-base'>
                                              <p className=''>{curelem.main}</p>
                                              <p className=''>{curelem.value}</p>
                                          </div>
                                       ) : (
                                        <div className='flex bg-blue-200 tracking-wider text-[#6775F3] p-1.5 rounded-lg bg-opacity-30 w-fit text-base'>
                                          <p>{curelem.main}</p>
                                          <p>{curelem.value}</p>
                                      </div>
                                       )
                                    }
                                      
                                    </> */}



                                    {/* <div className='flex justify-between bg-blue-200 tracking-wider text-[#6775F3] p-1.5 px-3 rounded-lg bg-opacity-30 w-full text-base'>
                                            <>
                                                <div className='flex w-fit'>
                                                    <input type="text" defaultValue={curelem.main} className='h-fit w-[30px]'/>

                                                </div>
                                            </>
                                          ) : (
                                              <>
                                                  <p onClick={handleEditing}>{curelem.main}</p>
                                                  <p>{curelem.value}</p>
                                              </>
                                          )
                                        
                                        </div>
                                       ) : (
                                        <div className='flex bg-blue-200 tracking-wider text-[#6775F3] p-1.5 rounded-lg bg-opacity-30 w-fit text-base'>
                                          <p onClick={handleEditing}>{curelem.main}</p>
                                          <p>{curelem.value}</p>
                                      </div> } */}
                        </div>
                      </>
                    ) : null
                }
            </>
        }
        
                        {/* <div className='p-3 pl-5  '>
                              <h1 className='bg-blue-200 tracking-wider text-[#6775F3] p-1.5 rounded-lg bg-opacity-30 w-fit text-base'>
                              {
                                data.map((curelem)=>{
                                  return(
                                    <>
                                      {curelem.value}
                                    </>
                                  )
                                })
                                
                              }
                              
                              </h1>
                        </div> */}
        
        {/* {
          type ? (
            <>
                <div className='p-3 pl-5 accordion-border flex text-left items-center justify-between cursor-pointer' onClick={handleShow}>
                    <h1 className='text-[#575757] text-base'>Type</h1>
                    {
                        show ? (
                          <>
                              <BsChevronUp className='w-[14px] h-[14px]'/>
                          </>
                        ):(
                            <BsChevronDown className='w-[14px] h-[14px]'/>
                        )
                    }
                    
                </div>
                {
                    show ? (
                      <>
                        <div className='p-3 pl-5  '>

                              <h1 className='bg-blue-200 tracking-wider text-[#6775F3] p-1.5 rounded-lg bg-opacity-30 w-fit text-base'>{type}</h1>
                        </div>
                      </>
                    ) : null
                }
            </>
          ) : null
        }
         */}
        
        
    </>
  )
}

export default Accordion; 