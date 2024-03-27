import { client } from '../db.mjs'
import express from 'express';
import fs from 'fs'

const router = express.Router()
const db = client.db('Test_Jannis');

let auditLog = fs.createWriteStream('./audit.txt', {
    flags: 'a'
})

router.route('/')
.get(async (req,res) => {
    try {
        const crimes = await db.collection('Crime').find({}).toArray();
        res.json(crimes)
    } catch (error) {
        console.log(error.message)
    }
})
.post(async (req,res) => {
    try {
        const {Rolle, Erfasser} = req.body
        let AktuellesDatum = new Date()
        
        if (Rolle === "Admin") {
            const Tat = await db.collection('Crime').find().sort({ _id: -1 }).limit(1).toArray();
            const newId = Tat[0]._id + 1
            const {Name} = req.body
            await db.collection('Crime').insertOne({
                _id: newId,
                Name: Name
            })
            .then(
                auditLog.write(AktuellesDatum +": Es wurde der Tatbestand "+ Name+ " von "+ Erfasser+ " hinzugefügt "),
                res.status(201).send('Tatbestand hinzugefügt')
            )
        } else {
            res.status(403).send("Nicht für diese Aktion authorisiert");
        }
    } catch (error) {
        console.log(error) 
    }
})


router.route('/:Id')
.patch(async (req,res) => {
    try {
        const {Rolle, Erfasser} = req.body
        let AktuellesDatum = new Date()

        if (Rolle === "Admin") {

        const {Name} = req.body.Update
        const CrimeId = parseInt(req.params.Id);
        
        await db.collection('Crime').updateOne({_id: CrimeId}, {$set:{ Name: Name}})

        auditLog.write(AktuellesDatum +": Es wurde der Tatbestand "+ CrimeId+ " von "+ Erfasser+ " geändert "),

        res.status(200).send('Tatbestand bearbeitet')
        } else {
            res.status(403).send("Nicht für diese Aktion authorisiert");
        }
    } catch (error) {
       console.log(error) 
    }
})

.delete(async (req,res) => {
    try {
        const {Rolle, Erfasser} = req.body
        let AktuellesDatum = new Date()

        const CrimeId = parseInt(req.params.Id);
    
        if (Rolle === "Admin") {
            await db.collection('Crime').deleteOne({_id: CrimeId})
            auditLog.write(AktuellesDatum +": Es wurde der Tatbestand "+ CrimeId+ " von "+ Erfasser+ " gelöscht "),
            res.status(200).send("Tatbestand gelöscht");
            
        } else {
            res.status(403).send("Nicht für diese Aktion authorisiert");
        }
    } catch (error) {
        console.log(error) 
    }
})




export default router