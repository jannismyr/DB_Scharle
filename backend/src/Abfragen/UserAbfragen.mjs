import { client } from '../db.mjs'
import express from 'express';

const router = express.Router()
const db = client.db('Test_Jannis');


router.route('/')
.get(async (req,res) => {
    const users = await db.collection('User').find({}).toArray();
    res.json(users)
})


router.route('/:Id')
.get(async (req,res) => {
    try {
        const userId = req.params.Id; // Achte darauf, dass dies zu params.id geändert wurde
        console.log(userId);

        const users = await db.collection('User').findOne({ Id: userId });

        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

export default router