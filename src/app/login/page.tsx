"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";


export default function LoginPage() {
const router = useRouter();
 const [buttonDisabled, setButtonDisabled] = React.useState(false);

 const [loading, setLoading] = React.useState(false);

const [user , setUser] = React.useState({
        email: "",
        password: ""
})

const onLogin = async () => {
     
    try {
        setLoading(true);
        const response = await axios.post('/api/users/login',user);
        console.log("Login Succesfull");
        router.push('/profile');
        
    } catch (error:any) {
        console.log(error.message);
        
    }
    finally{
        setLoading(false);
    }

} 


useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false);
    }
    else{
        setButtonDisabled(true);
    }
} , [user] );



return (
<div className="flex flex-col items-center justify-center min-h-screen py-2">
<label htmlFor="email">{loading ? "Processing.." : "Login"}</label>
<input type="text"
className="p-2 rounded-lg m-1 text-black"
id="email"
value={user.email}
onChange={(e) => {
setUser({...user,email: e.target.value})
}}
placeholder="email"
/>

<hr />

<input type="text"
className="p-2 rounded-lg m-1 text-black"
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

<button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 mt-6
focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Login" : "Login"}</button>


<Link href={'/signup'}>Go To Signup page </Link>
</div>
)

}