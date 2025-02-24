import React from 'react'
import RoomCardCollection from '../../components/roomComponent/roomCardCollection'

const Page = () => {
  return (
    <div className="p-4">
        <h1 className="text-2xl text-center">Sharing Room</h1>
        <RoomCardCollection roomtype="sharing"/>
    </div>
  )
}

export default Page