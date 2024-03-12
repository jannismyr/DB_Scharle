import express from 'express';
//import {MongoClient} from 'mongodb'
import { client } from './db.mjs'

const port = 8000;
const app = express();

await client.connect();
const db = client.db('Test_Jannis');

app.use(express.json());
app.listen(port,() => {
    console.log(`Der Server läuft auf port ${port}`)
})

app.get('/', (req,res) => {
    res.send('Hallo')
})

app.route('/users')
.get(async (req,res) => {
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


