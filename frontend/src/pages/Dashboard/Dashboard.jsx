import React from 'react'
import Mybooking from '../../components/Mybooking/Mybooking'
import Bookings from '../../components/Mybooking/Bookings'
import { useRecoilValue } from 'recoil'
import { userRecoil } from '../../Recoils/Atoms'

const Dashboard = () => {
  const user = useRecoilValue(userRecoil)
  return (
    <div className="text-lg">
      Dashboard
      {/* <DoctorRegister/> */}
      {/* <Sign/> */}
      {user=="Patient"? <Mybooking/>: <Bookings/>}
      
      
      
      {/* <Mybooking/>
      <Bookings/> */}
      {/* <List/> */}
    </div>
  )
}

export default Dashboard
