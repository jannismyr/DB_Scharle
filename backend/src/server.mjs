import express from 'express';
import {MongoClient} from 'mongodb'

const port = 8000;
const app = express();



async function start(){

    const url = 'mongodb://localhost:27017'
    const client = new MongoClient(url)
    
    await client.connect();
    const db = client.db('Test_Jannis');

    app.get('/users', async (req,res) => {
        const users = await db.collection('User').find({}).toArray();
        res.json(users)
    })
    
    app.get('/users/:Id', async (req,res) => {
        try {
            const userId = req.params.Id; // Achte darauf, dass dies zu params.id geändert wurde
            console.log(userId);
    
            const users = await db.collection('User').findOne({ _id: userId });
    
            res.send(users);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    })


}


app.use(express.json());
app.listen(port,() => {
    console.log(`Der Server läuft auf port ${port}`)
})

app.get('/', (req,res) => {
    res.send('Hallo')
})

start();
