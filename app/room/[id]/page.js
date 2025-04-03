"use client"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react';

const Page = () => {
  const params = useParams()
  const roomID = params.id; // Get the dynamic ID
  // console.log(id);
  const [room, setRoom] = useState([]); // Store API data

  useEffect(() => {
    fetch(`/api/room/${roomID}`)
      .then((res) => res.json())
      .then((data) => setRoom(data));
  }, []);
  
  
  // console.log(await res.json());

  // const body = await res.json();
  // const rooms = body.data;
    
  return (
    <div>

    </div>
  )
}

export default Page