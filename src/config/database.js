import mongoose from "mongoose";
const { MONGODB_URI } = process.env;
 
try {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('Connect database success');
} catch (error) {
    console.log('Could not connect to database', error);
}

export default mongoose;