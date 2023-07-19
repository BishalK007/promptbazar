import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log('MongoDB is Connected!!');
        return;
    }
    try{
        const options = {
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology: true, 
        };
        await mongoose.connect(process.env.MONGODB_URI ?? '', options)
        isConnected = true;
        console.log('mongoDB is connected');
    } catch(error){
        console.log(error);
    }
}