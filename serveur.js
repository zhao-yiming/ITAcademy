let express=require('express');
let app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));

var mysql=require('mysql');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'cours'
});
connection.connect(function(error){if(error)console.log(error)});

let session=require('express-session');
app.use(session({
    secret:'my secret',
    resave:false,
    saveUninitialized:true
}))
/*
app.get('/',(req,res)=>{
    connection.query("select*from cour;",function(error,result){
        if (error)console(error);
        res.render('formation.ejs',{cours:result})
    });
});*/

app.post('/connect',(req,res)=>{res.render('connection.ejs');})
app.post('/consult',(req,res)=>{res.redirect('/consult')})
app.post('/finaliser',(req,res)=>{res.redirect('/finaliser');})
app.post('/retourCatalogue',(req,res)=>{res.redirect('/');})


let user='';
/*
let courSelection=[];

app.post('/enregistrer',(req,res)=>{
    user=req.body.pseudo;
    req.session.user=user;

    if (user != '' & courSelection.length>0){
        res.redirect('/finaliser');
    }
    else{
        res.redirect('/');
    }
})*/


app.get('/cours/inscrire/:i',(req,res)=>{
    let i=parseInt(req.params.i);
    if (courSelection.indexOf(i)===-1){
        courSelection.push(i);
    }
    res.redirect('/');
});

app.get('/consult',(req,res)=>{
    connection.query("select*from cour WHERE id IN ('"+courSelection.join("','")+"')",function(error,result){
        if (error)console(error);
        res.render('panier.ejs',{cours:result})
    });
});
/*
app.get('/cours/delete/:i',(req,res)=>{
    let i=parseInt(req.params.i);
    const index=courSelection.indexOf(i);
    if(index>-1){courSelection.splice(index,1)};
    res.redirect('/consult');
    
});

app.get('/finaliser',(req,res)=>{
    if (user != '' & courSelection.length>0){
        connection.query("INSERT INTO session (user,coursID) VALUES (?,?)",[user,String(courSelection)],function(err,result){});
        courSelection=[];
        user=''
        res.redirect('/validation');
        return;
    }
    if(user==''){
        return res.render('connection.ejs');
    }
    if (courSelection.length==0){
        return res.send('choisissez au moins une formation!');
    }
    
});

app.get('/validation',(req,res)=>{
    res.send('vos choix ont été confirmé');
});
*/
app.listen(8080,()=>{});