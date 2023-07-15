import mongoose from "mongoose";
import { connected } from "process";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log('MongoDB is Connected!!');
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI ,{
            dbName:"share_prompt",
            useUnifiedTopology:true,
            useNewUrlParser:true,
        })
        isConnected = true;
        console.log('mongoDB is connected');
    }catch(error){
        console.log(error);
    }
}