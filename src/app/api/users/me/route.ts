import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse,NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


connect();


export async function GET(request:NextRequest) {


    try {
        const UserID = await getDataFromToken(request);
        const user = await User.findById(UserID).select("-password");
        return NextResponse.json({
            message:"User Found",
            datas:user
        });
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }




}