//import modules
var express = require('express');
var path = require('path');
var app = express();
const exphbs = require('express-handlebars');
const port = process.env.port || 3000;
//static files
app.use(express.static(path.join(__dirname, 'public')));
//configure handlebars
app.engine('.hbs', exphbs.engine({ extname: '.hbs', 
helpers:{

   checkreviews:function(avg_reviews){
    if(avg_reviews=='')
    return ('N/A')
else
    return avg_reviews
   }

},
}));
app.set('view engine', 'hbs');
//step6:
const studentname="Akshath DSouza";
const studentid="N01579323";
//routes
app.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
 res.render('ass1',  { studentname: `${studentname}`,studentid:`${studentid}`});

});
app.get('/users', function(req, res) {
  res.send('respond with a resource');
});

//step6
const fs = require('fs');
const { stringify } = require('querystring');
let myData = fs.readFileSync('datasetA.json');
let data= JSON.parse(myData);
app.get('/data/', function(req, res){
    console.log("JSON data is loaded and ready!");
    console.log(data);
    res.send("JSON data is loaded and ready!");
  });


  app.get('/data/isbn/:index', function(req, res) {
    const index = req.params.index;
    const searchedbook = data[index] ? data[index].ISBN_13 : "Index not found";
    res.render('ass1',{searchedbook});
  });

  app.get('/data/search/isbn',function(req,res){
    res.send(`<form action="/data/search/isbn/result" method="GET">
            <label for="isbn">Enter ISBN:</label>
            <input type="text" id="isbn" name="isbn">
            <button type="submit">Search</button>
            </form>`
            );
  });

  app.get('/data/search/isbn/result', function(req, res){
    const isbn = req.query.isbn;
    let bookres = null;
    for (let i=0;i<data.length;i++) {
        if (data[i].ISBN_13==isbn) {  
            bookres = data[i];
            break;
        }
    }
    if(bookres!=null){
        
        res.render('ass1',{isbn:bookres.ISBN_13,title:bookres.title,author:bookres.author,price:bookres.price,pages:bookres.pages})
    }else{
        res.render('ass1',{isbn:"Not Found"});
    }
  });
  
  app.get('/data/search/title/',function(req,res){
    console.log("Hello1")
    res.send(`<form action="/data/search/title/result" method="GET">
            <label for="title">Enter Title:</label>
            <input type="text" id="title" name="title">
            <button type="submit">Search</button>
            </form>`
            );
  });

  app.get('/data/search/title/result', function(req, res){
    //console.log("Hello2");
    const title = req.query.title;
   // console.log(title);
    let bookres = null;
    for (let i=0;i<data.length;i++) {
        if (data[i].title.includes(title)) {  
            bookres = data[i];
            break;
        }
    }
    if(bookres!=null){
       
        res.render('ass1',{title:bookres.title,isbn:bookres.ISBN_13,author:bookres.author,price:bookres.price,pages:bookres.pages})
    }else{
        res.render('ass1',{title:"Not Found"});
    }
  });

  //step7
  app.get('/allData', (req, res) => {
    res.render('allbooks', { data });
  });
  //step8
  app.get('/review', (req, res) => {
    res.render('review', { data });
  });
  //step9
  app.get('/high', (req, res) => {
    res.render('highlight', { data });
  });

  //step 10
  app.get('/last',function(req,res){
    res.render('creative', { title: 'Books',  data });

  })
  app.get('*', function(req, res) {
    res.render('error', { title: 'Error', message:'Wrong Route' });
  });
//start server and listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})