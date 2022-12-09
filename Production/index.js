const express = require("express");
const path = require("path");


const app = express();
const port = process.env.PORT || 3100;

app.use(express.static(path.join(__dirname,"..", 'frontend','build')));

app.get("*", async (req, res)=>{
    res.sendFile(path.join(__dirname, "..","frontend", "build", "index.html"));
})


app.listen(port, ()=> console.log("server is running on" + port));
