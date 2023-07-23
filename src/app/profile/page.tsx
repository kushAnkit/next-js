"use client"
import axios from "axios"
import React  from "react"
import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import { useState } from "react"
import Link from "next/link"





export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const Logout = async () => {
        try {
        const reso = await axios.get('/api/users/logout');
            router.push('/login')
            
        } catch (error:any) {
            return NextResponse.json({error:error.message},{status:500})
        }

    }

    const getDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            console.log(res.data.datas._id)
            setData(res.data.datas._id);
            
        } catch (error:any) {
            return NextResponse.json({error:error.message})
        }




    }



return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
      <h2 className=""> {data==="nothing" ? "Nothing":<Link href={`/profile/${data}`}>check</Link> }</h2>
        <hr />
        <button onClick={Logout} className="bg-blue-500 py-2 px-4 text-white mt-4 rounded-lg">Log out</button>
        <hr />
        <button onClick={getDetails} className="bg-green-700 py-2 px-4 text-white mt-4 rounded-lg">Get Details</button>
    </div>
)
}