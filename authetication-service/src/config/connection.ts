import mongoose  from "mongoose";
const databaseURL:string = process.env.MONGO_URL!;
const options={
  dbName: process.env.MONGO_DB,
}
mongoose.connect(databaseURL,options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Expose the Mongoose instance
export default  mongoose;