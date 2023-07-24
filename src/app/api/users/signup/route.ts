import {connect} from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();


export async function POST(request:NextRequest) {

try {

    const reqBody = await request.json();
    const {username , email, password} = reqBody;

    console.log(reqBody);
    

    // check if user exist
    const user =  await User.findOne({email});
    console.log(user);
    

    if(user) {
        return NextResponse.json({error: "User already exists"},
       {status:400} )
    }


    // hash the password
    
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password,salt);


    // creaate a new user


    const newUser = new User({
        username,
        email,
        password: hashPassword
    });

    const savedUser =  await newUser.save();
    console.log(savedUser);

  const mail =  await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

    return NextResponse.json({
        message: "User created succesfully",
        success:true,
        savedUser
    })
    
} catch (error:any) {
    return NextResponse.json({error:error.message},
        {status:500})
}

}

