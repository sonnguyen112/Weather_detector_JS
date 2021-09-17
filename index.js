const express = require("express")
const morgan = require("morgan")

const app = express()

//set middleware
app.use(express.urlencoded())
app.use(express.json())

//set http logger
//app.use(morgan())

//set template
app.set("view engine", "hbs")

//set static
app.use(express.static(__dirname + "/static"))

//set route
app.use("/", require("./routes/index"))

//start server
app.listen(3000, function(){
    console.log("http://localhost:3000")
})