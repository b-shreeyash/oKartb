const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const categoryRoutes = require('./routes/category');
const brandRoutes = require('./routes/brand');
const productRoutes = require('./routes/product');
const customerRoutes = require('./routes/customer');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const { verifyToken, isAdmin } = require('./middleware/auth-middleware');
const app   = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send(`server is running`);
});

app.use("/category", verifyToken,isAdmin, categoryRoutes);
app.use("/brand",verifyToken,isAdmin,brandRoutes);
app.use("/product",verifyToken,isAdmin,productRoutes);
app.use("/customer",verifyToken,customerRoutes);
app.use("/auth", authRoutes);

async function connectDb() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error(err));
}

connectDb().catch((err) => {
    console.error(err);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
