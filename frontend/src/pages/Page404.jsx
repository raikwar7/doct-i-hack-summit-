import React from 'react'
// import Btn from './Home/Btn'
import { useNavigate } from 'react-router-dom'
import Btn from '../components/Btn';

const Page404 = () => {
    const navigate = useNavigate();

    const btninfo = [
        {
            label : "Go Home",
            onclick : ()=>{
                navigate("/")
            }
        },
        {
            label : "Contact Us",
            onclick : ()=>{
                navigate("/contact")
            }
        },

    ]
  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <p className='text-[150px] font-semibold text-center p-2 sm:text-[200px]'>400</p>
      <h1 className='text-[50px] font-semibold text-center p-2'>PAGE NOT FOUND</h1>
      <p className='text-gray-500 text-center my-4 p-2'>The Page you are looking for was moved removed renamed or might never existed</p>
      <div className='flex gap-8 my-6'>
        {
            btninfo.map((ele,idx)=>{
                return <Btn  btninfo={ele} key={idx}/>
            })
        }
      </div>
    </div>
  )
}

export default Page404
