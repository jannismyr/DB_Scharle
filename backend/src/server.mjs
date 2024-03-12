import express from 'express';
//import {MongoClient} from 'mongodb'
import { client } from './db.mjs'

import UserQueries from './Abfragen/UserAbfragen.mjs'
import CaseQueries from './Abfragen/FallAbragen.mjs'


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

app.use('/users', UserQueries)

app.use('/case', CaseQueries)
