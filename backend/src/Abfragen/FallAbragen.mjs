import { client } from '../db.mjs'
import express from 'express';

const router = express.Router()
const db = client.db('Test_Jannis');


function newAktenzeichen(Bundesland) {
    
    const Datum = new Date()
    let Aktenzeichen= "";

    switch (Bundesland) {
        case "Baden-Württemberg":
            Aktenzeichen += "BW"
            break;
        case "Bayern":
            Aktenzeichen += "BA"
            break;
        case "Saarland":
            Aktenzeichen += "SL"
            break;
        case "Thüringen":
            Aktenzeichen += "TH"
            break;
        case "Hessen":
            Aktenzeichen += "HE"
            break;
        case "Sachsen":
            Aktenzeichen += "SH"
            break;
        case "Sachsen-Anhalt":
            Aktenzeichen += "SA"
            break;
        case "Niedersachsen":
            Aktenzeichen += "NS"
            break;
        case "Bremen":
            Aktenzeichen += "BR"
            break;
        case "Hamburg":
            Aktenzeichen += "HH"
            break;
        case "Berlin":
            Aktenzeichen += "BE"
            break;
        case "Brandenburg":
            Aktenzeichen += "BB"
            break;
        case "Schleswig-Holstein":
            Aktenzeichen += "SH"
            break;
        case "Rheinland-Pfalz":
            Aktenzeichen += "RP"
            break;
        case "Nordrhein-Westfalen":
            Aktenzeichen += "NW"
            break;
        case "Mecklenburg-Vorpommern":
            Aktenzeichen += "NV"
            break;
        default:
            Aktenzeichen += "Fehler"
            break;
    }
    if (Aktenzeichen !== "Fehler") {
        Aktenzeichen += `${Datum.getYear()}${Datum.getMonth()}${Datum.getDay()}${Datum.getHours()}${Datum.getMinutes()}${Datum.getSeconds()}${Datum.getMilliseconds()}`
    }
    return Aktenzeichen
}


router.route('/')
.get(async (req,res) => {
    const cases = await db.collection('Case').find({}).toArray();
    res.json(cases)
})
.post(async (req,res) => {

    const {Tatvorwurf} = req.body
    const {Erfasser_ID, ErfasserName} = req.body.Erfasser
    const {VNameOpfer, NNameOpfer, AWN_Opfer, AdresseOpfer,TelNumOpfer} = req.body.Opfer
    const {VNameTaeter, NNameTaeter, AWN_Taeter, Tatort,Tatzeit, Tatwaffe} = req.body.Taeter
    const {Bundesland, Landkreis, Ort} = req.body.Ort

    let Aktenzeichen = newAktenzeichen(Bundesland)

    if (Aktenzeichen !== "Fehler") {

        await db.collection('Case').insertOne({
            _id: Aktenzeichen,
            Tatvorwurf: Tatvorwurf,
            Erfasser: {
                Erfasser_ID: Erfasser_ID,
                ErfasserName: ErfasserName
            },
            Opfer: {
                VNameOpfer: VNameOpfer,
                NNameOpfer: NNameOpfer,
                AWN_Opfer: AWN_Opfer,
                AdresseOpfer: AdresseOpfer,
                TelNumOpfer: TelNumOpfer
            },
            Taeter:{
              VNameTaeter: VNameTaeter,
              NNameTaeter: NNameTaeter,
              AWN_Taeter: AWN_Taeter,
              Tatort: Tatort,
              Tatzeit: Tatzeit,
              Tatwaffe: Tatwaffe
            },
            Ort: {
                Bundesland: Bundesland,
                Landkreis: Landkreis,
                Ort: Ort
            }
        })
        .then(
            res.status(201).send('Fall hinzugefügt')
        )

    } else {
        res.status(404).send("Fehler Bei Aktenzeichen")
    }
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
                await db.collection('Case').updateOne({_id: userId}, {$set:{ [key]: body[key]}})

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

router.post('/:Aktenzeichen/Beweise', async (req,res) => {

})

router.post('/:Aktenzeichen/Verknuepfen', async (req,res) => {
    
})

export default router