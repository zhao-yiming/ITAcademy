let express=require('express');
let app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

let router = require('./route');
app.use('/', router);

let session=require('express-session');
app.use(session({
    secret:'my secret',
    resave:false,
    saveUninitialized:true
}))

app.listen(8080,()=>{});