const connectDB = require('./Config/db');
const app = require('./app');
const { ServerPort } = require('./secret');


app.listen(ServerPort,async()=>{
  console.log(`Server is running on ${ServerPort}`);
  await connectDB();
<<<<<<< HEAD
  
=======

>>>>>>> f1f891f6cca537cedf5f794ccf54195a063e0299
})