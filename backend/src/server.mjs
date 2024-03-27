import express from 'express';
import { client } from './db.mjs'
import cors from 'cors';
import bcrypt from 'bcrypt';
import UserQueries from './Abfragen/UserAbfragen.mjs'
import CaseQueries from './Abfragen/FallAbragen.mjs'
import CrimeQueries from './Abfragen/TatenAbfragen.mjs'
import { Users, Straftaten } from './data.mjs';
import fs from 'fs'

let auditLog = fs.createWriteStream('./audit.txt', {
    flags: 'a'
})

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus:200,
  }

const port = 8000;
const app = express();

await client.connect();
const db = client.db('Test_Jannis');
app.use(cors(corsOptions))
app.use(express.json());
app.listen(port,() => {
    console.log(`Der Server läuft auf port ${port}`)
})

app.get('/', (req,res) => {
    res.send('Hallo')
})

app.use('/users', UserQueries)
app.use('/case', CaseQueries)
app.use('/crime', CrimeQueries)


app.post('/Daten/erstellen', async (req,res)=> {
    const saltRounds = 10

    Users.forEach(element => {
        element.Passwort = bcrypt.hashSync(element.Passwort, saltRounds);
    })
    
    await db.collection('User').insertMany(Users)
    await db.collection('Crime').insertMany(Straftaten)

    res.status(201).send('Alle Daten angelegt')
})

app.get('/Suche', async(req,res) => {
    
})


