const express = require('express');
const port = 8000;
const path = require('path');
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assests'));

// Middleware

// app.use(function(req,res,next){
//     req.myName = "Shivam";
//     console.log("Middleware called!");
//     next();
// })

var contactList = [
    {
        name:'Shivam',
        phone:'123456789'
    },
    {
        name:'baba',
        phone:'34242423'
    },
    {
        name:'oyaoya',
        phone:'7865048321'
    }
]

app.get('/',function(req,res){
    // console.log(__dirname);
    // res.send("<h1>Hey it's working!!");
    return res.render('home',{title:'My contact list', contact_List:contactList});

});

app.get('/practice',function(req,res){
    return res.render('practice',{title:'Practice page'});
});

app.post('/create_contact',function(req,res){

    // console.log(req);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    contactList.push(req.body);

    // return res.redirect('/');
    return res.redirect('back');

});

app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    let phone = req.query.phone;
    // let name = req.query.name;
    let contactIndex = contactList.findIndex(contact => contact.phone==phone);

    if(contactIndex != -1){
        contactList.splice(contactIndex,1);
    }
    
    return res.redirect('back');

});

app.listen(port,function(err){
    if(err){
        console.log("Error: ",err);
    }
    console.log("The express server is running on port:",port);
});
