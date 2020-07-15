const express = require('express');
const mongoose = require('mongoose');

//Importing Routes
const userRouter = require('./routes/api/userRouter');
const gossipRouter = require('./routes/api/gossipRouter');
const profileRouter = require('./routes/api/profileRouter');

const port = process.env.PORT || 5000;
const app = express();

//DB Configuration
const db = require('./config/keys').mongoURL;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((success) => {
    console.log("MongoDB connected.");
  })
  .catch((err) => console.log(err));

app.get('/', (req,res)=>{
    res.send('Hello');
});

//Use Routes
app.use('/api/users', userRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/gossips", gossipRouter);

app.listen(port,()=>console.log(`Server running on port:${port}`));

