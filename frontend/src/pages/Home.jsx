import React, { useEffect } from 'react'
import UserBlock from '../component/users/UserBlock'
import ChatArea from '../component/chats/ChatArea'
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'

function Home() {


  return (
    <div className='w-full md:w-3/4 h-full bg-[#F5D7E3] border flex gap-1'>
        <div className='w-full md:w-1/3 h-full bg-[#0D1821] text-white'>
            <UserBlock/>
        </div>
        <div className='w-2/3 h-full overflow-hidden'>
            {/* <ChatArea/> */}
            <Outlet/>
        </div>
    </div>
  )
}

export default Home