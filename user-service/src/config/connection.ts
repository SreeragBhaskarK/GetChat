import mongoose  from "mongoose";
const databaseURL:string = process.env.MONGO_URL!;
const options={
  dbName: process.env.MONGO_DB,
}
export const connectDB = ()=>{
  try{
   return mongoose.connect(databaseURL,options)
   
  }catch(error:any){
    console.error('Error connecting to MongoDB:', error.message);
  }
}


