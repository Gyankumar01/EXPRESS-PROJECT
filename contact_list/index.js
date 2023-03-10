//we will add all the package in this file
const express=require('express');
//we will be giving a port no where this file will run
const port=8000;
//It will fire up all the function to run the server
const app=express();
//SET the path
const path=require('path');
//IT will make the data from the form to an object
app.use(express.urlencoded({ extended: true }));

// app.use(express.static('assets'));
app.use(express.static('assets'));
//Now set the view engine as EJS
app.set('view engine','ejs');

//Now set the view path
//__dirname will automaticall find the views folder
app.set('views',path.join(__dirname,'views'));



var contactList=[{
    name:"Gyan",
    phoneno:"123456789"
},
{
    name:"venkatesh",
    phoneno:"222333444"
},
{
    name:"Ravi",
    phoneno:"01010101"
},
{
    name:"Rahul",
    phoneno:"222333444"
}];

app.get('/',function(req,res){
    return res.render('home',{
        title:"Contact-list",
        contact_List:contactList
    });
 });

 app.post('/create-contact',function(req,res) {
    contactList.push({
        name:req.body.name,
       phoneno:req.body.phoneno 
    });
    return res.redirect('/');
 });

 app.post('/delete-contact',function(req,res) {
    let phoneno=req.query.phoneno;

    let contactIndex = contactList.findIndex(contact => contact.phoneno == phoneno );

    if(contactIndex!=-1){
        contactList.splice(contactIndex,1);
    }

    return res.redirect('back');
 });


app.listen(port,function(err){
    if(err){
        console.log('Error is there',err);
    }
    console.log('YUP! MY server is running on port',port);
});