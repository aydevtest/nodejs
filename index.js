const express = require('express')
const path = require('path')
const app = express();
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname , 'public')))

app.get('/' , (req,res) =>{
    fs.readdir(`./files` , (err , files)=>{
        res.render('index' , {files : files})
    })
})


app.get('/file/:filename' , (req,res) =>{
    fs.readFile(`./files/${req.params.filename}` , "utf-8" , (err , filedata) =>{
        console.log(filedata)
        res.render('show' , {filename : req.params.filename , filedata : filedata})
    })
})

app.get('/edit/:filename' , (req,res) =>{
    res.render('edit' , {filename  : req.params.filename})
})

app.post('/edit' , (req,res) =>{
    let newFileName = req.body.new;
    if (!path.extname(newFileName)) { 
        newFileName += ".txt"; 
    }
    fs.rename(`./files/${req.body.previous}` , `./files/${newFileName}` , () =>{
        res.redirect('/')
    })
})


app.post('/create' , (req,res) =>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt` , req.body.details , (err) =>{
        res.redirect('/')
    })
})


app.listen(8004 , () =>{
    console.log('done');
})