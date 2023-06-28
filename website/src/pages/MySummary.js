import React , {useEffect , useState} from 'react'
import axios from 'axios';

import Sidebar from '../components/Sidebar'
import { BsArrowRight } from 'react-icons/bs'

const MySummary = () => {
  const [data , setData ] = useState({});
  const [isData , setIsData] = useState(false);
  // const handleFetch = async()=>{
  //   const formData = new FormData();
  //   formData.append("email", 'ykamble20comp@student.mes.ac.in');
  //   formData.append("id", "642fe497f01cf44e4442ac45");
  //   try {
  //     const response = await axios.post(`${URL}`, formData);
  //     const fetchedData = await response.data;
  //     console.log(fetchedData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();
      formData.append("email", 'ykamble20comp@student.mes.ac.in');
      // formData.append("id", "642fe497f01cf44e4442ac45");
      const result = await axios.post('http://3238-34-91-228-183.ngrok-free.app/fetch_summaries',formData);
      setData(result.data);
    };
    setIsData(true);
    fetchData();
  }, []);
  console.log('Data aaya re Fetch hokr',data);
  console.log('isData',isData);
  return (
    <>
        <div className='flex'>
          <Sidebar squeeze={'false'}/>
          <div className='mysummary-grid-main'>
                <div className='border-bottom'>
                    
                </div>
                <div className='mysummary-grid-cards bg-[#fdfdfd] overflow-y-scroll min-[460px]'>
                {/* map the cardItem */}
                {
                      data ? (
                        <>
                        {
                          data?.all_summaries?.map((item)=>{
                            return(
                              <>
                              <div className='card-item flex flex-col justify-between bg-white rounded-lg border p-4'>
                    
                
                                  <div className='p-4 text-2xl font-semibold text-[#333333]'>
                                    <p>{item.title}</p>
                                  </div>
                                  <div className='flex items-center text-[#5986FF] p-4 text-left cursor-pointer'>
                                    <p>Go to summary</p>
                                    <BsArrowRight/>
                                  </div>
                                </div>
                              </>
                            )
                          })
                        }
                        </>
                      ):(
                        <>
                          <h1>no data</h1>
                        </>
                      )
                    }
                
                
                {/* {
                  isData ? (
                    data.map((curElem)=>{
                      console.log('curElem',curElem);
                    })
                  ):(
                    <>
                        <h1>iiidsa</h1>
                    </>
                  )
                    
                } */}
                    {/* <div className='card-item flex flex-col justify-between bg-white rounded-lg border p-4'>
                        <div className='p-4 text-2xl font-semibold text-[#333333]'>
                            <p>Presentation Meeting on UI UX</p>
                        </div>
                        <div className='flex items-center text-[#5986FF] p-4 text-left'>
                          <p>Go to summary</p>
                          <BsArrowRight/>
                        </div>
                    </div>
                    <div className='card-item flex flex-col justify-between bg-white rounded-lg border p-4'>
                        <div className='p-4 text-2xl font-semibold text-[#333333]'>
                            <p>Presentation Meeting on UI UX</p>
                        </div>
                        <div className='flex items-center text-[#5986FF] p-4 text-left'>
                          <p>Go to summary</p>
                          <BsArrowRight/>
                        </div>
                    </div>
                    <div className='card-item flex flex-col justify-between bg-white rounded-lg border p-4'>
                        <div className='p-4 text-2xl font-semibold text-[#333333]'>
                            <p>Presentation Meeting on UI UX</p>
                        </div>
                        <div className='flex items-center text-[#5986FF] p-4 text-left'>
                          <p>Go to summary</p>
                          <BsArrowRight/>
                        </div>
                    </div>
                    <div className='card-item flex flex-col justify-between bg-white rounded-lg border p-4'>
                        <div className='p-4 text-2xl font-semibold text-[#333333]'>
                            <p>Presentation Meeting on UI UX</p>
                        </div>
                        <div className='flex items-center text-[#5986FF] p-4 text-left'>
                          <p>Go to summary</p>
                          <BsArrowRight/>
                        </div>
                    </div>
                    <div className='card-item flex flex-col justify-between bg-white rounded-lg border p-4'>
                        <div className='p-4 text-2xl font-semibold text-[#333333]'>
                            <p>Presentation Meeting on UI UX</p>
                        </div>
                        <div className='flex items-center text-[#5986FF] p-4 text-left'>
                          <p>Go to summary</p>
                          <BsArrowRight/>
                        </div>
                    </div> */}
                    
                   
                </div>
          </div>
        </div>
    </>
  )
}

export default MySummary