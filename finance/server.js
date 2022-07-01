const express = require('express');
const app = express();
const port = 8000;
const cors = require("cors");
const cookieParser = require('cookie-parser');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

require("./server/config/mongoose.config")
require("./server/routes/user.routes")(app)
require("./server/routes/transaction.routes")(app)
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );