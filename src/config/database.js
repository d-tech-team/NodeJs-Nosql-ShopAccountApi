import mongoose from "mongoose";

try {
    mongoose.connect('mongodb://localhost:27017/d-shop', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('Connect database success');
} catch (error) {
    console.log('Could not connect to database', error);
}

export default mongoose;