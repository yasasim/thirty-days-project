const express = require("express");
const app = express();

app.use(express.static("product"));
app.use(express.static("image"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/product/index.html");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("The server is runnning on port 3000.");
});