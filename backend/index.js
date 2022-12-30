const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const route = require("./route.js")
const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://function-UP:Latha7226@cluster0.acdvxwp.mongodb.net/code-rhythm?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});

app.use("/", route)





