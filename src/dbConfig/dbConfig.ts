import mongoose from "mongoose";

export async function connect() {

try{
   await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log('MongoDb is connected succesfully');
    });


    connection.on('error', (err) => {
        console.log('Mongoose connection error. Please make sure MongoDb is running. ' + err);
            process.exit();
    })



}
catch(error) {
    console.log('something went wrong');
    console.log(error);

}



}

