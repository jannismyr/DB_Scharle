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

router.route('/:Aktenzeichen')
.get(async (req,res) => {
    try {
        const CaseId = req.params.Aktenzeichen;
        const searchedCase = await db.collection('Case').findOne({ Aktenzeichen: CaseId });
        res.status(200).send(searchedCase);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
.patch(async (req,res) =>{
    try {
        const body = req.body.Update
        const CaseId = req.params.Aktenzeichen;
        const searchedCase = await db.collection('Case').findOne({ Aktenzeichen: CaseId });
        for (const key in body) {
            if (Object.hasOwnProperty.call(searchedCase, key)) {
                await db.collection('User').updateOne({_id: userId}, {$set:{ [key]: body[key]}})

                /*auditLog.write("Die Veranstaltung "+GesuchteVeranstaltung['Titel']+ " wurde am "
                +Datum.toLocaleDateString()+" um "+ Datum.getHours()+":" +Datum.getMinutes()+ " aktualisiert. \n"+ 
                "--> Das Attribut "+ key+ " wurde von " + alteDaten+ " zu "+ GesuchteVeranstaltung[key]+ " geändert \n")*/
            }
        }
        res.status(200).send('Fall bearbeitet')
    } catch (error) {
        console.log(error.message)
    }
})
.delete(async (req,res) => {
    try {
        const Rolle = req.body.rolle
        const CaseId = req.params.Aktenzeichen;
    
        if (Rolle === "Admin") {
            await db.collection('Case').deleteOne({Aktenzeichen: CaseId})
            res.status(200).send("Fall gelöscht");
        } else {
            res.status(403).send("Nicht für diese Aktion authorisiert");
        }
        } catch (error) {
            console.log(error.message)
        }
})


export default router