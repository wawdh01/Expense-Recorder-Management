const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');

dotenv.config();

const app = express();

const port =  process.env.PORT || 5000;


app.use(cors({
	origin: ["http://localhost:3000", "http://192.168.1.112:3000/"],
	credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('The server is running...');
});

mongoose.connect(process.env.MDB_CONNECT,{useNewUrlParser: true, useUnifiedTopology: true}, (err)=> {
  if(err) return console.error(err);
  console.log('Connected to MongoDB...');
})


app.listen(port, () => {
  console.log(`Expenses app listening at http://localhost:${port}`);
});

app.use("/auth", require('./routers/userRouter'));
app.use("/income", require('./routers/incomeRoute'));
app.use("/expense", require('./routers/expenseRoute'));
app.use("/category", require('./routers/categoryRoute'));