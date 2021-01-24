import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import path from 'path';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://GoGet2:goget123@cluster0.kemkl.mongodb.net/GoGet2?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'AbmjDi0NRCVvw9SoN4vjiAIQgRcp7taBeuRAsoWIGBHxsxUwxpEXVDKh67CDZpxM3caPlm4Ik6b8LoHU');
});

//build 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}

app.get('/', (req, res) => {
  res.send("server is ready");
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 6001;

app.listen(port, () => {
  console.log("server is ready");
});