const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

let counter = 0;
let lastUpdate = Date.now()

app.use(cors());
app.use(express.json());

app.get('/counter', (req, res) => {
  res.json({
    value: counter, 
    lastUpdate: lastUpdate
  })
})


app.post('/counter', (req,res) => {
    const { value, timestamp} = req.body;

    console.log("UPDATE COUNTER TO " + value);

    if(timestamp > lastUpdate){
        counter = value;
        lastUpdate = timestamp;
    }

    res.json({value: counter, updatedAt: lastUpdate})
})



app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
