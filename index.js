const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser'); 
const app = express();
const port = 3000;
const DepartmentsRoutes = require('./api/Routes/Departments');
const companyRoutes=require('./api/Routes/companies')
const url = 'mongodb+srv://benataref:Zeyneb32&@cluster0.2b0fu.mongodb.net/HR?retryWrites=true&w=majority&appName=Cluster0'; 
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true , serverSelectionTimeoutMS: 30000 })
    .then(result => console.log("Database connected"))
    .catch(err => console.log(err));  
    
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/Departments', DepartmentsRoutes);
//app.use('/api/candidates', candidateRoutes);
app.use('/companies', companyRoutes);
// app.use('/api/employees', employeeRoutes);
// app.use('/api/departments', departmentRoutes);
// app.use('/api/salaries', salaryRoutes);
app.get("/", (req, res) => {
    res.send("<h1>Hello from Node.js app</h1>");
});


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404; 
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.listen(port, () => {
    console.log("Server is running at port " + port);
});

module.exports = app;
