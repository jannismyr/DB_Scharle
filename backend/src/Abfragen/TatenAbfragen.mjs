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

})


router.route('/:Id')
.patch(async (req,res) => {
    try {
        const {Name} = req.body.Update
        const CrimeId = req.params.Id;
        console.log(CrimeId)
        
        await db.collection('Case').updateOne({_id: userId}, {$set:{ Name: Name}})

                /*auditLog.write("Die Veranstaltung "+GesuchteVeranstaltung['Titel']+ " wurde am "
                +Datum.toLocaleDateString()+" um "+ Datum.getHours()+":" +Datum.getMinutes()+ " aktualisiert. \n"+ 
                "--> Das Attribut "+ key+ " wurde von " + alteDaten+ " zu "+ GesuchteVeranstaltung[key]+ " geändert \n")*/

        res.status(200).send('Fall bearbeitet')

    } catch (error) {
       console.log(error) 
    }
})

.delete(async (req,res) => {

})




export default router