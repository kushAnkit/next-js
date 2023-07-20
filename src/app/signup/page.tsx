"use client";
import Link from "next/link";
import React ,{ useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function SignupPage() {
const router = useRouter();
const [user , setUser] = React.useState({
        email: "",
        password: "",
        username: ""
})


const [buttonDisabled, setButtonDisabled] = React.useState(false);

const [loading, setLoading] = React.useState(false);

const onSignup = async () => {
    try {
        setLoading(true);
        
        const response = await axios.post("/api/users/signup", user);
        console.log("Signup success", response.data);
        router.push("/login");

    } catch (error: any) {
        console.log("Signup Failed" , error.response.data)
    }
    finally {
        setLoading(false)
    }




} 

useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
} , [user] );


return (
<div className="flex flex-col items-center justify-center min-h-screen py-2">

<label htmlFor="username">{loading ? "Processing" : "Signup"}</label>
<input type="text"
className="p-2 rounded-lg m-1 text-black"
id="username"
value={user.username}
onChange={(e) => {
setUser({...user,username: e.target.value})
}}
placeholder="username"
/>

<hr />


<input type="text"
className="p-2 text-black rounded-lg m-1"
id="email"
value={user.email}
onChange={(e) => {
setUser({...user,email: e.target.value})
}}
placeholder="email"
/>

<hr />


<input type="text"
className="p-2 rounded-lg text-black m-1"
id="password
"
value={user.password
}
//  e is event
onChange={(e) => {
setUser({...user,password
    : e.target.value})
}}
placeholder="password"
/>

<button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 mt-6
focus:outline-none focus:border-gray-600">{buttonDisabled ? "No signUp" : "Signup"}</button>

<Link href={'/login'}>Go To Login Page</Link>
</div>
)

}