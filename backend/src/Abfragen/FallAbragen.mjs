import { client } from '../db.mjs'
import express from 'express';

const router = express.Router()
const db = client.db('Test_Jannis');

router.route('/')
.get(async (req,res) => {
    const cases = await db.collection('Case').find({}).toArray();
    res.json(cases)
})
.post(async (req,res) => {

    let Id = '1'

    let Waffe = 'Schaufel'

    await db.collection('Case').insertOne({
        _id: Id,
        Tatwaffe: Waffe
    })
    .then(
        res.status(201).send('Fall hinzugefügt')
    )
})


export default router