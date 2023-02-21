import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
    try{
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URL ? process.env.MONGO_URL : "",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log("MongoDB Connected..");
    } catch(err: any){
        console.log(err?.message);
        // kills the running application
        process.exit(1);
    }
};

export default connectDB;