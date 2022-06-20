var express = require('express');
var cors = require("cors");
var app = express();
var bodyParser = require('body-parser');

var server = require("http").Server(app);
require('dotenv').config()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


require('./data/connectDB');




var router = express.Router();
router.use(express.static('public'));

var urlCodeParser = require('body-parser').urlencoded({ extended: false });

app.use('/', require('./routers/taskRouter'));
app.use(require('./routers/accountRouter'));


app.use(router);

server.listen(process.env.PORT || 8080, () => {
  console.log("Listening.... on http://localhost:8080/");
});