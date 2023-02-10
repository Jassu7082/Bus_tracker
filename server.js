const express =require("express");
const connectDB =require("./config/db");

const app = express();
const http = require("http");
const {Server} = require("socket.io");
connectDB();
app.use(express.json({extended : false}))
const cors =require("cors");
app.use(cors({origin:true}))
app.get("/",(req,res)=> res.send("API running"));

//Trying socket
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})
//Define Routes
app.use("/api/users",require("./routes/api/users"));
app.use("/api/profile",require("./routes/api/profile"));
app.use("/api/auth",require("./routes/api/auth"));
app.use("/api/posts",require("./routes/api/posts"));
app.use("/api/dauth",require("./routes/api/dauth"));
const  PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log("server started on port "+PORT)); 