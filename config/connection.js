const mongoose = require('mongoose')

const connectionString = process.env.CONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log('MongoDB Atlas is Successfully conected with cookpedia Server');
    
}).catch(err=>{
    console.log("MongoDB Atlas connection is failed");
    console.log(err);
    
})