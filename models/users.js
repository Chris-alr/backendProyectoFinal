const mongoose = require('mongoose');
const { post } = require('../routes/routesUser');
const postSchema = new mongoose.Schema({
    local:{
        name: String,
        password: String,
    }
    
   

});
module.exports = mongoose.model("User", postSchema);