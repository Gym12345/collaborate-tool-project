const express = require("express");

const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
app.use( bodyParser.urlencoded({extended:false}) );
const sessionConfig = require("./config/session/session_config");
app.use( bodyParser.json() );
const fileStore=require("session-file-store")(session);
sessionConfig.sessionConfig.store =new fileStore({path : './sessions'});
app.use( session(sessionConfig.sessionConfig) );
const cookieParser = require("cookie-parser")
app.use(cookieParser());


app.set("views", ["./main_src/views", "./src/auth/views" ,"./src/board/views" ,"./src/contribution/views"]); //for multiple views folder path
app.set("view engine","ejs");



const router = require("./main_src/router/global_router")(app);
app.use("/", router);


app.listen(3000,()=>{ console.log("3000 port server"); });


