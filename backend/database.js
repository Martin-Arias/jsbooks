const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
   
})
    .then(db=>console.log('DB conectada'))
      .catch(err => console.log(err));
      
        
    