"use client"
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

const Page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
  
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
    }, [status, router]);
    
  return (
    <div>
        Home Page
    </div>
  )
}

export default Page