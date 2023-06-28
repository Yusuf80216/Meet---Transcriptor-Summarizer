const mongoose = require('mongoose');
const db = 'mongodb+srv://deepblue:deepblue@cluster0.vvisee8.mongodb.net/meetminute?retryWrites=true&w=majority'

mongoose.connect(db).then(()=>{
    console.log('connection successful');
}).catch((error)=>{
    console.log('errorDB',error);
})