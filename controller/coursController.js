var mysql=require('mysql');
const coursModel = require('../models/courModel');
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'AAaa@@11',
    database:'cours'
});
connection.connect(function(error){if(error)console.log(error)});
let courModel=require('../models/courModel');


module.exports.connection = function(req,res){res.render('connection.ejs')}

module.exports.cours = function (req,res){
    connection.query("select*from cour;",function(error,result){
        if (error)console(error);
        res.render('formation.ejs',{cours:result})
    });
};

let courSelection=[];
let selectionId=[];
let user='';

module.exports.select=function(req,res){
    user=req.body.pseudo;
    if (user != '' & courSelection.length>0){
        res.redirect('/finaliser');
    }
    else{
        res.redirect('/cours');
    }
}

module.exports.inscrire=function(req,res){
    let id=parseInt(req.params.i);
    connection.query('SELECT * FROM cour WHERE id =?',req.params.i,(request, result) => {
        courChoisit=new coursModel(id,result[0].nom,result[0].prix,result[0].debut,result[0].fin);
        if (selectionId.indexOf(id)===-1){
            courSelection.push(courChoisit);
            selectionId.push(id);
        }
    });
    
    res.redirect('/');
};

module.exports.consult=function(req,res){
    connection.query("select*from cour WHERE id IN ('"+selectionId.join("','")+"')",function(error,result){
        if (error)console(error);
        res.render('panier.ejs',{cours:result})
    });
};

module.exports.delete=function(req,res){
    let i=parseInt(req.params.i);
    const index=selectionId.indexOf(i);
    if(index>-1){selectionId.splice(index,1)};
    res.redirect('/consult');
    
};

module.exports.finaliser=function(req,res){
    if (user != '' & courSelection.length>0){
        connection.query("INSERT INTO session (user,coursID) VALUES (?,?)",[user,String(selectionId)],function(err,result){});
        courSelection=[];
        selectionId=[];
        user='';
        res.render('succesMessage.ejs');
        return;
    }
    if(user==''){
        return res.render('connection.ejs');
    }
    if (courSelection.length==0){
        return res.send('choisissez au moins une formation!');
    }
}