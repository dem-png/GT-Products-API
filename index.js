import express from "express"

const app = express()
const port = 3000;

app.get('/info',(req,res) => {
    res.send('Name: Rosh Andrei Lantin, Section: IT4B, Program: BSIT');
});

app.get ('/id', (req,res) => {
    const id = res.params.id;
    console.log (`Received ID: ${id}`);
});

app.get ('/:name', (req,res) => {
    const name = res.params.name;
    res.send(`Hello ${name.name}!`);
    
});

app.get('/foo',(req,res) => {
    console.log(req.query);
});

app.get ('/IT', (req,res) => {
    const body = req.body;
    console.log(body);
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));

