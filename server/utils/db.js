const mongoose = require('mongoose');
// const URI = "mongodb://127.0.0.1:27017/mern_admin"

//coder dostp
const URI = process.env.MONGODB_URI;

// mongoose.connect(URI);

const connectDb = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("connection with DB successful");
        
    } catch (error) {
        console.error('database connection faild')
        process.exit(0)
    }
}

module.exports = connectDb