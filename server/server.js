const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth.routes');
const blogRouter = require('./routes/blog.routes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 9000;
require('dotenv').config()

connectDB()
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(PORT, () => console.log(`Server running at ${PORT}`))

app.use('/', authRouter)
app.use('/blog', blogRouter)
