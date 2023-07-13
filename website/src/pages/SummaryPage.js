import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import arrowDown from '../assets/arrow_down.svg'
import Accordion from '../components/Accordion';
import Sidebar from '../components/Sidebar';
import { IoIosArrowDown, IoIosFlash } from 'react-icons/io';
import { VscSymbolKeyword } from 'react-icons/vsc';
import { GrTask, GrTextAlignRight } from 'react-icons/gr';
import userLogo from '../assets/user-pfp.jpg'
import { MdOutlineChat, MdOutlineFileUpload } from 'react-icons/md';
import { BsArrowDown, BsCameraVideo, BsChatLeftText, BsChevronDown, BsChevronUp, BsDot, BsPlus, BsStars, BsTextParagraph } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import arrowUp from '../assets/arrow_up.svg'
import { RiShareLine } from 'react-icons/ri';
import { FiUser } from 'react-icons/fi';
import { GoSearch, GoTasklist } from 'react-icons/go';
import { AiOutlineClose, AiOutlineCloudUpload, AiOutlineFileText, AiOutlineLink } from 'react-icons/ai';
import { TbLanguageHiragana } from 'react-icons/tb';
import Transcript from '../components/Transcript';
import { FaRegUserCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext} from '../context';
import Account from '../components/Account';
import { SlGlobe } from 'react-icons/sl';
import { UserAuth } from '../context/AuthContext';


const SummaryPage = () => {
  // const contextName = useContext(AppContext);
  // const contextName = useGlobalContext()
  const [language , setLanguage] = useState("");
  const {user,getTitle,meetTitle,getDate,meetDate} = UserAuth();
  const [isUploadData , setIsUploadData] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const [isTranscriptLoading , setIsTranscriptLoading] = useState(false);
  const [isSummaryLoading , setIsSummaryLoading] = useState(false);
  const [isFilterLoading , setIsFilterLoading] = useState(false);
  const [toggleTabs , setToggleTabs] = useState(1); // 1 and true daalkr dekhhh
  const handleLanguage = (languageCode)=>{
    setLanguage(languageCode);
    // console.log('LanguageCode',language);
  }
  const toggletab =(index)=>{
    setToggleTabs(index);
  }
  const [show , setShow] = useState(true);
  const handleShow=()=>{
    setShow(!show);
  }
  
  const [showDropDown , setShowDropDown] = useState(false);
  const [showUploadDropDown , setshowUploadDropDown] = useState(false);
  const [apiData, setApiData] = useState("Your Transcript will appear here.");
  const [isData, setIsData] = useState(false);
  const [meetfilterData, setMeetFilterData] = useState(null);
  const [summaryapiData , setSummaryApiData] = useState(null);
  const [isMeetFilterData , setIsMeetFilterData] = useState(false)
  const [isSummaryData , setIsSummaryData] = useState(false)
  const imgRef = useRef();
  const menuRef = useRef();

//   window.addEventListener("click",(e)=>{
  //     console.log('Haa bhai', e.target === menuRef.current);
  //     //  if(e.target !== menuRef.current){
    //     //     setShowDropDown(false);
    //     //  }
    //   })
    const api = 
    [
      {
        id:1,
      data:'Keyword',
      subdata:'UI UX dataaaaaaa1',
    },
    // {
    //   id:2,
    //   data:'Speakers',
    //   subdata:'Web Development',
    // },
    // {
      //   id:3,
      //   data:'Talktime',
      //   subdata:'Google Cloud',
    // },
  ]
  
  const [apiCallData,setApiCallData] = useState({});
  const [textFile,setTextFile] = useState(null)
  const [noOfSpeaker, setNoOfSpeaker] = useState(0);
  const handleOtherApi = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const formData = new FormData();
    formData.append("file", textFile);
    formData.append("speakers", );
    formData.append("file", textFile);
    try {
      const response = await axios.post("{2nd api}/sidebar", formData);
      const data = await response.data;
      console.log(data);
      setApiCallData(data)
    } catch (error) {
      console.error(error);
    }
  };
  
  
  // API Calls starts here;
  const handleFileChange = (event) => {
    setTextFile(event.target.files[0]);
  };
  console.log('TextFile:',textFile);


    const dropDownData = ['Profile' ,'Checkout','My Account','Logout'];
    const uploadDropDownData = ['Upload a recording'];
    
    
    const [showFilters , setShowFilters] = useState(false);
    // console.log('USEREMAIL',user.email);

    const handleGenerate= async(e)=>{
      setToggleTabs(2);
      setShowFilters(true);
      setIsLoading(true);
      setIsFilterLoading(true);
      setIsTranscriptLoading(true);
      e.preventDefault();
      const formData = new FormData();
      const filterFormData = new FormData();
      formData.append("file",textFile);
      formData.append("user_language",language);
      formData.append("email",user.email);
      try {
        const response = await axios.post("http://a35a-34-139-32-60.ngrok-free.app/details", formData);
        let data = await response.data;

        console.log('TextTranscript',JSON.stringify(data));

        setApiData(data)
        setIsData(true)
        filterFormData.append("data",JSON.stringify(data));
        filterFormData.append("file",textFile);
        try {
          const filterResponse = await axios.post("http://1fa7-34-87-78-226.ngrok.io/sidebar",filterFormData);
          let filterdata = await filterResponse.data;
          setMeetFilterData(filterdata)
          setIsMeetFilterData(true);
        } catch (error) {
          console.log('FilterError:',error);
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
      setIsFilterLoading(false);
      setIsTranscriptLoading(false);
    }
    console.log('isLoading',isLoading);
    console.log('isDetailsData',isData);
    console.log('DetailsData:',apiData);
    console.log('isFiilterLoading',isFilterLoading);
    console.log('isFilterData',isMeetFilterData);
    console.log('filterData',meetfilterData);
  useEffect(()=>{
    const getMeetTitle = async()=>{
      // 1+1 == 3 ? "FETCHED": "NOT FETCHED"
      // await getTitle('yash')
      await getTitle(
          headingApi.summaryData.map((curelem)=>{
            return curelem.title;
          }
        )
      )
      await getDate(headingApi.summaryData.map((curelem)=>{
        return curelem.date;
      }))
    }
    getMeetTitle();
  },[]) 

  const handleFinalGenerate= async(e)=>{
    const summaryFormData = new FormData();
    var type = accordionData.datacontent[0].data.content[0].value;
    var num_speakers = apiData.no_of_speakers;
    var new_filename = apiData.new_file;
    setToggleTabs(1);
    setIsSummaryLoading(true);
      summaryFormData.append("user_language",language)
      summaryFormData.append("num_speakers",num_speakers)
      summaryFormData.append("new_filename",new_filename)
      summaryFormData.append("email",user.email)
      summaryFormData.append("type",type)
      try {
        const summaryResponse = await axios.post("http://c912-34-83-5-110.ngrok.io/summary",summaryFormData);
        let summaryData = await summaryResponse.data;
        setSummaryApiData(summaryData)
        setIsSummaryData(true)
        await getTitle(headingApi.summaryData.map((curelem)=>{
          return curelem.title;
        }))
        await getDate(headingApi.summaryData.map((curelem)=>{
          return curelem.date;
        }))
      } catch (error) {
        console.log('SummaryError:',error);
      }
      setIsSummaryLoading(false);
      }
      console.log('SummaryData',summaryapiData);
      console.log('isSummaryData',isSummaryData);
      var dataReceivedFromSummary;
      if(summaryapiData){
            
        console.log(`Now i fetched`,summaryapiData);
      }
   const accordionData = 
  
  {
    datacontent : [
      {
            id:1,
            title:'Type',
            data:
              {
                content:[
                  {
                    //  main:'Type',
                     value:'Business'
                  },
                ]
              }
            
          },
          {
            id:2,
            title:'Speakers',
            data:
              {
                content:[
                  {
                    //  main:'Speakers',
                     value:'2'
                  },
                ]
              }
            
          },
          {
            id:3,
            title:'Talktime',
            data:
              {

                content:[
                   {
                      main:'Speaker 1',
                      value:'75%'
                   },
                   {
                      main:'Speaker 2',
                      value:'45%'
                   },
                ]
              }
            
          },
          {
            id:4,
            title:'Keywords',
            data:
              {

                content:[
                   {
                      value:'ux challenge'
                   },
                   
                   {
                      value:'speaker evening renowned'
                   },
                   {
                      value:'design speaker thank ishita'
                   },
                   
                ]
              }
            
          },
       ]
    };

    const headingApi = 
    {
        'summaryData' : 
        [
            {
                title:'Presentation meeting 2023',
                date:'wed 29 march 2023',
                time:'6:46pm'
            }
        ],
    };

    const finalsummaryApi =
    {
        datacontent : [
          {
            id:1,
            type:'Business',
            subject:"Summary of Business meet",
            date:"31-03-2023",
            duration:"2hrs",
            data:[
              {
                 agendaData:[
                    {
                      item: "Item1"
                    }, 
                    {
                      item: "Item2"
                    }, 
                    {
                      item: "Item3"
                    }, 
                 ],
                 actionData:[
                    {
                      item:"action1",
                      assignedTo: "assignto",
                      dueDate: "dueDate",
                    }
                 ],
                 summary : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam inventore animi eos dolor accusamus quasi aut sed et, qui similique unde quae natus? Maxime consequatur temporibus facilis ducimus eos cupiditate quaerat, perspiciatis minus. Ullam deleniti nisi, nam illo nemo modi dolor possimus minus temporibus, impedit, vitae voluptate fuga quod totam?"
                
              }
            ],
          },
          {
            id:2,
            type:'Workshop',
            subject:"Summary of Business meet",
            date:"31-03-2023",
            duration:"2hrs",
            data:[
              {
                 keyTakeawayData:[
                    //
                 ],
                 summary : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam inventore animi eos dolor accusamus quasi aut sed et, qui similique unde quae natus? Maxime consequatur temporibus facilis ducimus eos cupiditate quaerat, perspiciatis minus. Ullam deleniti nisi, nam illo nemo modi dolor possimus minus temporibus, impedit, vitae voluptate fuga quod totam?"
              }
            ],
          },
          {
            id:3,
            type:'General',
            subject:"Summary of Business meet",
            date:"31-03-2023",
            duration:"2hrs",
            data:[
              {
                 agendaData:[
                    {
                      item: "Item1"
                    }, 
                    {
                      item: "Item2"
                    }, 
                    {
                      item: "Item3"
                    }, 
                 ],
                 summary : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam inventore animi eos dolor accusamus quasi aut sed et, qui similique unde quae natus? Maxime consequatur temporibus facilis ducimus eos cupiditate quaerat, perspiciatis minus. Ullam deleniti nisi, nam illo nemo modi dolor possimus minus temporibus, impedit, vitae voluptate fuga quod totam?"
              }
            ],
          },
        ]
    };

    const summaryapi = 

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
              speaker: 'Speaker 1',
              time: '00:00',
              dialogue: "You.This hit goes out to you, Mr.Wake." 
            },
            {
              id:2,
              speaker: 'Speaker 2',
              time: '00:08',
              dialogue: "42 regular, wasn't it? " 
            },
            {
              id:3,
              speaker: 'Speaker 3',
              time: '00:10',
              dialogue: "Yeah. " 
            },
            {
              id:4,
              speaker: 'Speaker 3',
              time: '00:13',
              dialogue: "And so it begins. " 
            },
            {
              id:5,
              speaker: 'Speaker 1',
              time: '00:14',
              dialogue: "Yeah. Yeah. Behind enemy line soul I got Mona hope ya. " 
            },
            {
              id:6,
              speaker: 'Speaker 1',
              time: '00:23',
              dialogue: "Challenge him to single combat. If you win, you'll have your." 
            },
            {
              id:7,
              speaker: 'Speaker 2',
              time: '00:28',
              dialogue: "Freedom. And when I see you, I'm gonna take what I want, though. Amen. You ain't real. Hope y'all feel the wrapped up you got y'all don't stop. Many tribe, many guys. This is going to warm. Giddy. Bloody Bonniega." 
            },
            {
              id:8,
              speaker: 'Speaker 2',
              time: '00:58',
              dialogue: "The only way John Wick will ever have freedom. " 
            },
            {
              id:9,
              speaker: 'Speaker 2',
              time: '01:03',
              dialogue: "And peace. " 
            },
            {
              id:10,
              speaker: 'Speaker 2',
              time: '0:53:55',
              dialogue: "Is in death. " 
            },
        ]
      },
      'user_language_code': 'hi',
    }
  return (  
    <>
      <div className='flex'>
          <Sidebar squeeze={'false'}/>
          <div className='summary-grid-layout bg-[#ffffff]'>
          {/* bg-[#F2F3F7] => greyish */}
          {/* bg-[#fdfdfd] => White */}
              <div className='summary-grid-header bg-[#fdfdfd]'>
                <div className='hidden md:flex justify-end items-center border-b w-full h-[70px] py-5 shadow-sm space-x-4 pr-10'>
                        <div className='flex items-center gap-2  relative'>
                            <div className="searchBar">
                              <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search across the Summary" />
                              <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                                <svg className='w-[26px] h-[26px]' viewBox="0 0 24 24"><path fill="#666666" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                                </svg>
                              </button>
                            </div>
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
            
              <div className='summary-grid-subheader h-full w-full'>
                  <div className='flex items-center h-full gap-10 mx-5 '>
                  <div className='w-full flex flex-row items-center gap-8 whitespace-nowrap'>
                      <div className=''>
                          <p>{meetTitle}</p>
                      </div>
                      <div className=''>
                          <p>{meetDate}</p>    
                      </div>
                      {/* <div className=''>
                          <p>{curelem.time}</p>   
                      </div> */}
                      <button onClick={handleGenerate} className='bg-[#7465d5]  p-1.5 text-sm text-white rounded-lg'>Generate</button>
                  </div>
                    {/* {
                        headingApi.summaryData.map((curelem)=>{
                            return(
                                <>
                                <div className='w-full flex flex-row items-center gap-8 whitespace-nowrap'>

                                    <div className=''>
                                        <p>{curelem.title}</p>
                                    </div>
                                    <div className=''>
                                        <p>{curelem.date}</p>    
                                    </div>
                                    <div className=''>
                                        <p>{curelem.time}</p>   
                                    </div>
                                <button onClick={handleGenerate} className='bg-[#6775F3] p-1.5 text-sm text-white rounded-lg'>Generate</button>
                                </div>
                                </>
                            )
                        })
                    } */}
                    <div className='flex items-center justify-between px-3 w-full'>
                        <div className='tooltip w-full'>
                            <input type="file" accept='.txt' hidden className='input-field' onChange={handleFileChange}/>

                            <div className='flex justify-end gap-4'>
                            {/* onClick={() => document.querySelector(".input-field").click()} */}
                                <div className='relative flex items-center gap-1 p-1.5 border border-[#cecece] cursor-pointer' >
                                  <AiOutlineCloudUpload className='w-[20px] h-[20px] text-[#7465d5] cursor-pointer'/>
                                  <div className='flex items-center gap-1 ' onClick={()=>setshowUploadDropDown(!showUploadDropDown)}>
                                    <p>Upload</p>
                                    <BsChevronDown className='w-[10px] h-[10px] text-[#a09d9d]'/>
                                  </div>
                                </div>
                                {
                                    showUploadDropDown ? (
                                       <div className='bg-white dropDown border flex flex-col absolute z-[999] right-[8.5rem] w-[150px] min-h-[190px] top-[7.5rem] shadow-md text-white font-normal rounded-md'>
                                            <div className='flex items-center gap-2 border_bottom w-full p-3 whitespace-nowrap bg-[#7465d5] cursor-pointer' onClick={() => document.querySelector(".input-field").click()}>
                                              <p className='cursor-pointer'>Upload TXT</p>
                                              <AiOutlineFileText className='w-[20px] h-[20px] text-white'/>
                                            </div>
                                            <div className='flex flex-col items-center w-full text-left'>
                                                <div className='bg-[#7465d5] text-white w-full px-3 py-2 flex items-center border_bottom'>
                                                  <p className=''>Choose Language</p>
                                                  <SlGlobe className='w-[20px] h-[20px] text-white'/>
                                                </div>
                                                <div className='w-full cursor-pointer px-3 py-2 bg-[#7465d5]' onClick={()=>handleLanguage('en')} >
                                                  <p className=''>English</p>
                                                </div>
                                                <div className='w-full cursor-pointer px-3 py-2 bg-[#7465d5]' onClick={()=>handleLanguage('hi')}>
                                                  <p className=''>Hindi</p>
                                                </div>
                                                <div className='w-full cursor-pointer px-3 py-2 bg-[#7465d5]' onClick={()=>handleLanguage('mr')}>
                                                  <p className=''>Marathi</p>
                                                </div>
                                                <div className='w-full cursor-pointer px-3 py-2 bg-[#7465d5]' onClick={()=>handleLanguage('fr')} >
                                                  <p className=''>French</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                  }
                                <div className='flex items-center gap-2 p-1.5 border border-[#cecece] cursor-pointer'>
                                  <AiOutlineLink className='w-[20px] h-[20px] text-[#7465d5]'/>
                                  <p className='pr-1'>Share</p>
                                </div>
                            </div>
                          
                            {/* <span className='tooltiptext flex flex-col'>
                              <p>MEETING FORMAT</p>
                              <p>HERE</p>
                            </span> */}
                        </div>
                    </div>
                  </div>
              </div>
              <div className='summary-grid-main'>
                <div className='summary-grid-main-keywords'>
                    <div className='summary-grid-main-keywords-top flex justify-between gap-2 text-[#868686] items-center px-4 cursor-default h-full w-full'>
                        <div className='flex gap-2 text-[#868686] items-center'>
                          <BsStars className='w-[24px] h-[24px] text-[#7465d5]'/>
                          <h1>MeetFilters</h1>
                        </div>
                        {
                          showFilters ? (
                            <>
                                <button onClick={handleFinalGenerate} className='p-1.5 bg-[#7465d5] text-white rounded-lg text-sm transition-all duration-200 ease-in'>Generate</button>
                            </>
                          ) :(
                            <>
                                <button  disabled className='p-1.5 bg-[#a5a5a7] text-white rounded-lg text-sm'>Generate</button>
                            </>
                          )
                        }
                        
                    </div>
                  {
                    isFilterLoading ? (
                      <>
                        <div className='flex flex-col items-center justify-center h-full'>
                            <span className="loader_black"></span>
                        </div>
                      </>
                    ) : (

                    isMeetFilterData ? (
                        <>  
                            <div className='summary-grid-main-keywords-bottom overflow-y-scroll h-[430px] min-h-[430px] thin_scrollbar'>
                                {
                                      meetfilterData.datacontent.map((curelem)=>{
                                      console.log('dataMAP',curelem);
                                      return(
                                        <>
                                            <div className='p-3 pl-5 accordion-border flex text-left items-center justify-between cursor-pointer' onClick={handleShow}>
                                                <h1 className='text-[#575757] text-base'>{curelem.title}</h1>
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
                                                      <div className='p-3 pl-5 flex flex-col justify-between w-full gap-2 cursor-default'>
                                                          {
                                                            curelem.data.content.map((currentElem)=>{
                                                              console.log('ACCORDION',currentElem);
                                                              return(
                                                                <>
                                                                
                                                                {
                                                                  curelem.title == "Talktime" ? (
                                                                    <div className='flex justify-between  bg-blue-200 tracking-wider text-[#6775F3] p-1.5 px-3 rounded-full bg-opacity-30 w-full text-base'>
                                                                        <p>{currentElem.main}</p>
                                                                        <p>{(currentElem.value).toFixed(2)} %</p> 
                                                                    </div>
                                                                  ) : (
                                                                      <>
                                                                        <div className='flex justify-between  bg-blue-200 tracking-wider text-[#6775F3] p-1.5 px-3 rounded-full bg-opacity-30 w-fit text-base'>
                                                                          <p>{currentElem.value}</p> 
                                                                        </div>
                                                                      </>
                                                                  )
                                                                }
                                                                    
                                                                
                                                                </>
                                                              )
                                                            })
                                                          }
                                                      </div>
                                                    </>
                                                  ) : null
                                              }
                                        </>
                                      )
                                    })
                                }
                            </div>
                        </>
                      ) : (
                          <>
                            <div className='h-full flex items-center justify-center'>
                                  <h1 className='text-[#a5a2a2] text-sm cursor-default selection:bg-transparent selection:text-[#a5a2a2]'>No Meetfilter Data</h1>
                            </div>
                          </>
                        )
                    )
                  }
                </div>
                  
                  <div className='summary-grid-main-tabsection'>
                  
                        <div className='summary-grid-main-tabsection-top'>
                            {/* tabs */}
                            {/* <div className="bloc-tabs">
                            
                            </div> */}
                            <div onClick={()=>toggletab(1)} className={`${toggleTabs === 1 ? "tabs active-tabs" : "tabs"} summary-grid-tabs-1 flex gap-2 text-[#868686] items-center justify-center cursor-pointer h-full w-full`}>
                                <BsChatLeftText className='w-[24px] h-[24px]'/>
                                <h1>Summary</h1>
                            </div>
                            <div onClick={()=>toggletab(2)} className={`${toggleTabs === 2 ? "tabs active-tabs" : "tabs"} summary-grid-tabs-2 flex gap-2 text-[#868686] items-center justify-center cursor-pointer h-full w-full`}>
                                {/* <div className='flex items-center justify-center'>
                                </div> */}
                                <BsTextParagraph className='w-[24px] h-[24px]'/>
                                <h1>Transcript</h1>
                            </div>
                        </div>


                        <div className="content-tabs">                           
                              <div className={`${toggleTabs === 1 ? "content  active-content" : "content"} bg-red-500 `}>
                              {
                                  isSummaryLoading ? (
                                      <>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <span className="loader_black"></span>
                                            <p className='text-[#423f3f]'>Please wait for a moment...</p>
                                        </div>
                                      </>
                                  ) : (

                                    isSummaryData ? (
                                      <>  
                                          <div className='summary-grid-main-keywords-bottom overflow-y-scroll h-[430px] min-h-[430px] thin_scrollbar'>
                                              {/* {
                                                    meetfilterData.datacontent.map((curelem)=>{
                                                    console.log('dataMAP',curelem);
                                                    return(
                                                      <> */}
                                                {
                                                  summaryapiData.datacontent.data.map((curElem)=>{
                                                    {/* console.log('curelem',curElem);
                                                      console.log('data',curElem.actionData);
                                                      console.log('data',curElem.actionData[0]);
                                                      console.log('data',curElem.actionData[0].dueDate); */}
                                                      console.log('JOD',curElem.summary[0]);
                                                      return(
                                                        <>
                                                            <div className='ml-4 flex flex-col '>
                                                              <p>Sat, Mar 25, 2023 1:59</p>
                                                              <p>Speaker 1 , Speaker2 , Speaker 3</p>
                                                            </div>
                                                            <div className='overflow-y-scroll w-full px-2 h-[280px] pt-3 attach_scrollbar'>
                                                              <table className='Business w-full border rounded-lg overflow-y-scroll h-[280px]'>
                                                                    <thead className='bg-[#F9FAFC] rounded-lg'>
                                                                        <tr>
                                                                          <th className='text-left p-3'>
                                                                            <div className='flex items-center gap-3 ml-6'>
                                                                                <GoTasklist className='text-[#6775F3]'/>
                                                                                <p className='text-[#8D939F] font-normal text-sm'>Action</p>
                                                                            </div>
                                                                          </th>
                                                                          <th className=' p-3 text-[#8D939F] font-normal text-sm'>
                                                                            <div className='flex items-center mx-auto justify-center gap-2 ml-6'>
                                                                                <p className='text-[#8D939F] font-normal text-sm'>Deadline</p>
                                                                                <BsArrowDown className='text-[#6775F3]'/>
                                                                            </div>
                                                                          </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className='cursor-default'>
                                                                    {
                                                                      curElem.actionData.map((data)=>{
                                                                        return(
                                                                          <>{
                                                                            data.item == "" ? null : (
                                                                              <>
                                                                            <tr className='border-b'>
                                                                              <td className='p-3 flex flex-wrap'>
                                                                                <p className='pl-8 text-[#12161F]'>{data.item}</p>
                                                                              </td>
                                                                              <td className='text-center w-fit p-1.5'>
                                                                                <div className='bg-blue-200 tracking-wider text-blue-700 p-1.5 rounded-sm bg-opacity-40 flex items-center justify-center w-[150px] max-w-[150px] mx-auto whitespace-nowrap'>
                                                                                  <BsDot className='w-[20px] h-[20px]'/>
                                                                                  <span className='pr-1'>{data.dueDate}</span>
                                                                                </div>
                                                                            </td>
                                                                          </tr>

                                                                              </>
                                                                            )
                                                                          }
                                                                          </>
                                                                        )
                                                                      })
                                                                    }
                                                                      
                                                                    </tbody>
                                                              </table> 
                                                            </div>
                                                            <div className='summary-goes-here-content flex flex-col w-full text-left gap-3 pt-4 leading-relaxed'>
                                                                <h1 className='text-[#575757]'>Summary</h1>
                                                                <p>{curElem.summary[0]}</p>
                                                                {/* <p>The text is a conversation between two people discussing a challenge to single combat for freedom. They mention the name "Mona" and John Wick as someone who can only find freedom in death. The conversation ends with one person saying that the other has found themselves a god.o single combat for freedom. They mention the name "Mona" and John Wick as someone who can only find freedom in death. The conversation ends with one person saying that the other has found themselves a god.o single combat for freedom. They mention the name "Mona" and John Wick as someone who can only find freedom in death. The conversation ends with one person saying that the other has found themselves a god.o single combat for freedom. They mention the name "Mona" and John Wick as someone who can only find freedom in death. The conversation ends with one person saying that the other has found themselves a god.o single combat for freedom. They mention the name "Mona" and John Wick as someone who can only find freedom in death. The conversation ends with one person saying that the other has found themselves a god.o single combat for freedom. They mention the name "Mona" and John Wick as someone who can only find freedom in death. The conversation ends with one person saying that the other has found themselves a god.</p> */}
                                                            </div>
                                                        </>
                                                      )
                                                  })
                                                }
                                                        {/* </>
                                                    )
                                                  })
                                              } */}
                                          </div>
                                      </>
                                    ) : (
                                        <>
                                          <div className='h-full flex items-center justify-center'>
                                                <h1 className='text-[#a5a2a2] text-sm cursor-default selection:bg-transparent selection:text-[#a5a2a2]'>No Meetfilter Data</h1>
                                          </div>
                                        </>
                                      )
                                  )
                              }
                              
                              </div>

                            
                            <div className={`${toggleTabs === 2 ? "content  active-content" : "content"} `}>
                                {
                                    isTranscriptLoading ? (
                                      <>
                                          <div className='flex flex-col items-center justify-center h-full'>
                                              <span className="loader_black"></span>
                                              <p className='text-[#423f3f]'>Please wait for a moment...</p>
                                          </div>
                                      </>
                                      ):(
                                        isData ?(
                                          <div className='summary-contain-transcript-header flex flex-col ml-12 overflow-y-scroll attach_scrollbar h-[420px] min-h-full'>
                                             {
                                              apiData.speakers.map((curelem)=>{
                                                    return (
                                                        <>
                                                            <div className='m-4'>
                                                                <div className='flex gap-32 items-center'>
                                                                    <div className='flex items-center gap-3'>
                                                                        <FaRegUserCircle className='text-[#575757] w-[24px] h-[24px]'/>
                                                                        <p className='text-[#575757] text-[16px]'>{curelem.speaker}</p>
                                                                    </div>
                                                                    <p className='text-[#575757]'>{curelem.time}</p>
                                                                </div>
                                                                <div className='summary-contain-transcript-text pt-8 ml-[2.3rem] text-[#000000]'>
                                                                    <p>{curelem.dialogue}</p>
                                                                </div>
                                                            </div>
                                                        </>    
                                                    )
                                                })
                                             }
                                          </div>
                                        ) : (

                                            <>
                                              <div className='summary-contain-transcript-header flex flex-col ml-12 overflow-y-scroll attach_scrollbar h-[420px] min-h-full'>
                                                <div className='flex items-center justify-center h-full'>
                                                    <h1 className='text-[#a5a2a2] text-sm cursor-default selection:bg-transparent selection:text-[#a5a2a2]'>Transcript will generate here.</h1>
                                                </div> 
                                              </div>
                                            </>
                                        )
                                        )
                                    
                                  
                                }
                            </div>

                        </div>

                        
                        {/* <div className='summary-grid-main-tabsection-bottom'>
                            <div className={toggleTabs === 1 ? "content  active-content" : "content" }>

                            </div>
                            <div className={toggleTabs === 2 ? "content  active-content" : "content"}>

                            </div>
                        </div> */}
                  </div>
              </div>


          </div>
      </div>
    </>
  )
}

export default SummaryPage