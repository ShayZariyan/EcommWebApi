const express=require('express');
const app=express();
const mongoose=require('mongoose');
const prodrouter=require('./api/v1/routes/product');
const catrouter=require('./api/v1/routes/categories');
const morgan = require('morgan');
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan('dev'));
const secure=require('./api/v1/middlewares/secure');
app.use(secure);
app.use('/product',prodrouter);
app.use('/category',catrouter);

app.all('*',(req,res)=>{
    return res.status(404).json({Msg:"Not Found Error 404"});
});


const mongoConnstr=`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@shay.uijvx.mongodb.net/webapi2025`
mongoose.connect(mongoConnstr, { useNewUrlParser: true,useUnifiedTopology:true
})
    .then(() => console.log('Connected To Mongo'))
    .catch((err) => console.error('Connection Failed:', err));



module.exports=app;