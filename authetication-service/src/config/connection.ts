import mongoose  from "mongoose";
const databaseURL:string = process.env.MONGO_URL!;

mongoose.connect(databaseURL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

// Expose the Mongoose instance
export default  mongoose;