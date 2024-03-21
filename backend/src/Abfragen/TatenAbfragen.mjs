import { client } from '../db.mjs'
import express from 'express';

const router = express.Router()
const db = client.db('Test_Jannis');



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
        const Rolle = req.body.rolle
        
        if (Rolle === "Admin") {
            const Tat = await db.collection('Crime').find().sort({ _id: -1 }).limit(1).toArray();
            const newId = Tat[0]._id + 1
            const {Name} = req.body
            await db.collection('Crime').insertOne({
                _id: newId,
                Name: Name
            })
            .then(
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
        const Rolle = req.body.rolle
        if (Rolle === "Admin") {

        const {Name} = req.body.Update
        const CrimeId = parseInt(req.params.Id);
        
        await db.collection('Crime').updateOne({_id: CrimeId}, {$set:{ Name: Name}})

                /*auditLog.write("Die Veranstaltung "+GesuchteVeranstaltung['Titel']+ " wurde am "
                +Datum.toLocaleDateString()+" um "+ Datum.getHours()+":" +Datum.getMinutes()+ " aktualisiert. \n"+ 
                "--> Das Attribut "+ key+ " wurde von " + alteDaten+ " zu "+ GesuchteVeranstaltung[key]+ " geändert \n")*/

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
        const Rolle = req.body.rolle
        const CrimeId = parseInt(req.params.Id);
    
        if (Rolle === "Admin") {
            await db.collection('Crime').deleteOne({_id: CrimeId})
            res.status(200).send("Tatbestand gelöscht");
            
        } else {
            res.status(403).send("Nicht für diese Aktion authorisiert");
        }
    } catch (error) {
        console.log(error) 
    }
})




export default router