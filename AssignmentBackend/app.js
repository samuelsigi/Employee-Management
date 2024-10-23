const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const HttpError = require('./Model/http-error');
const mongoose = require('mongoose')

const departmentroutes = require('./Routes/department-routes')
const employeeroutes = require('./Routes/employee-routes');
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-type, Accept, Authorization');
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
        );
    next();
 })

app.use('/api/department',departmentroutes)
app.use('/api/employee',employeeroutes)


app.use((req, res, next)=>{
    const error = new HttpError('Could Not Find The Page You Were Looking For :(',404)
    throw error;
})


app.use((err, req, res, next) => {
    if(res.headerSent){
        return next(err);
    }
    res.status(err.code || 500);
    res.json({message: err.message || 'An Unknown Error Occurred!'});
});


mongoose.connect('mongodb+srv://samueljacob8880:faith123@faith.4r2ir.mongodb.net/?retryWrites=true&w=majority&appName=faith')
.then(()=>{
    app.listen(5000);
}).catch(err=>{
    console.log(err)
})

