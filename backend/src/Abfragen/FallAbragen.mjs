import { client } from '../db.mjs'
import express from 'express';
import fs from 'fs'

const router = express.Router()
const db = client.db('Test_Jannis');

let auditLog = fs.createWriteStream('./audit.txt', {
    flags: 'a'
})

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

    const {Tatvorwurf,Tatzeit} = req.body
    const {Erfasser_ID, ErfasserName} = req.body.Erfasser
    const {VNameOpfer, NNameOpfer, AWN_Opfer, AdresseOpfer,TelNumOpfer} = req.body.Opfer
    const {VNameTaeter, NNameTaeter, AWN_Taeter} = req.body.Taeter
    const {Bundesland, Landkreis, Ort, Tatort} = req.body.Ort

    let Aktenzeichen = newAktenzeichen(Bundesland)
    if (Aktenzeichen !== "Fehler") {

        await db.collection('Case').insertOne({
            _id: Aktenzeichen,
            Tatvorwurf: Tatvorwurf,
            Tatzeit: Tatzeit,
            Erfasser: {
                Erfasser_ID: Erfasser_ID,
                ErfasserName: ErfasserName
            },
            Opfer: {
                Vorname: VNameOpfer,
                Nachname: NNameOpfer,
                Ausweisnummer: AWN_Opfer,
                Adresse: AdresseOpfer,
                Telefonnummer: TelNumOpfer
            },
            Taeter:{
              Vorname: VNameTaeter,
              Nachname: NNameTaeter,
              Ausweisnummer: AWN_Taeter
            },
            Ort: {
                Bundesland: Bundesland,
                Landkreis: Landkreis,
                Ort: Ort,
                Tatort: Tatort
            },
            Beweise: [{
                Gegenstaende:[

                ],
                Bilder: [

                ],
                Zeugen:[

                ]
            }],
            VerknuepfteFaelle:[]
        })
        .then(
            console.log('Fall hinzugefügt'),
            res.status(201).send('Fall hinzugefügt')
        )

    } else {
        res.status(404).send("Fehler Bei Aktenzeichen")
    }
})

router.get('/Suche', async (req,res) => {
    try {
        const {Suche} = req.query
        const searchedCase = await db.collection('Case').find({
            $or: [
                {_id: {$regex: Suche, $options: 'i'}},
                {Tatvorwurf: {$regex: Suche, $options: 'i'}},
                {'Ort.Bundesland': {$regex: Suche, $options: 'i'}},
                {'Ort.Ort': {$regex: Suche, $options: 'i'}},
                {'Ort.Tatort': {$regex: Suche, $options: 'i'}},
                {'Opfer.VNameOpfer':{$regex: Suche, $options: 'i'}},
                {'Opfer.NNameOpfer': {$regex: Suche, $options: 'i'}},
                {'Opfer.AWN_Opfer': {$regex: Suche, $options: 'i'}},
                {'Taeter.VNameTaeter': {$regex: Suche, $options: 'i'}},
                {'Taeter.NNameTaeter': {$regex: Suche, $options: 'i'}},
                {'Taeter.AWN_Taeter': {$regex: Suche, $options: 'i'}},
            ] 
        }).toArray()
        res.status(200).send(searchedCase)

    } catch (error) {
        console.error(error);
        res.status(404).send("Fehler bei der Suche")
    }
})
/*router.get('/Analyse', async (req,res) => {
    try {
        const {Suche, Vorwurf, Ort} = req.query
        console.log("Suche aktiviert")

        const searchedVorwurf = await db.collection('Case').find({
            $and: [
                {Tatvorwurf: {$regex: Vorwurf, $options: 'i'}},
                {'Ort.Bundesland': {$regex: Ort, $options: 'i'}},
            ] 
        }).toArray()

        /*const searchedOrt = await db.collection('Case').find({
            $or: [
                {'Ort.Bundesland': {$regex: Ort, $options: 'i'}},
                {'Ort.Ort': {$regex: Ort, $options: 'i'}},
                {'Ort.Tatort': {$regex: Ort, $options: 'i'}},
            ] 
        }).toArray()

        console.log(searchedVorwurf)

        console.log(searchedVorwurf.length)

        //console.log(searchedOrt.length)



        res.status(200).send(searchedVorwurf)

    } catch (error) {
        console.error(error);
        res.status(404).send("Fehler bei der Suche")
    }
})
*/
router.route('/:Aktenzeichen')
.get(async (req,res) => {
    try {
        const CaseId = req.params.Aktenzeichen;
        const searchedCase = await db.collection('Case').findOne({ _id: CaseId });
        res.status(200).send(searchedCase);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
.patch(async (req,res) =>{
    try {
        const {Erfasser} = req.body
        let AktuellesDatum = new Date()

        const body = req.body.Update

        const CaseId = req.params.Aktenzeichen;
        const searchedCase = await db.collection('Case').findOne({ _id: CaseId });
        for (const key in body) {
            if (Object.hasOwnProperty.call(searchedCase, key)) {
                await db.collection('Case').updateOne({_id: CaseId}, {$set:{ [key]: body[key]}})

                auditLog.write(AktuellesDatum +": Der Fall "+ CaseId+ " wurde and der Stelle "+ key + " von "+ Erfasser+ " geändert")
            }
        }
        
        res.status(200).send('Fall bearbeitet')
    } catch (error) {
        console.log(error.message)
        res.status(404).send("Fehler beim Update")
    }
})
.delete(async (req,res) => {
    try {
        const {Rolle,Erfasser} = req.body
        let AktuellesDatum = new Date()

        const CaseId = req.params.Aktenzeichen;
    
        if (Rolle === "Admin") {
            await db.collection('Case').deleteOne({_id: CaseId})
            auditLog.write(AktuellesDatum +": Der Fall "+ CaseId+ " wurde von "+ Erfasser+ " gelöscht")
            res.status(200).send("Fall gelöscht");
        } else {
            res.status(403).send("Nicht für diese Aktion authorisiert");
        }
        } catch (error) {
            console.log(error.message)
            res.status(404).send("Fehler beim Löschen aufgetreten")
        }
})

router.post('/:Aktenzeichen/Beweise', async (req,res) => {
    try {
        const CaseId = req.params.Aktenzeichen;
        const query = req.query.Art
        const {Erfasser} = req.body
        let AktuellesDatum = new Date()

        switch (query) {
            case "Gegenstand":
                const {GArt, SRN, Marke, GRelevanz} = req.body
                await db.collection('Case').updateOne({_id: CaseId}, {$push:{'Beweise.0.Gegenstaende': {
                    GegenstandsArt: GArt,
                    Seriennummer: SRN,
                    Marke: Marke,
                    Relevanz: GRelevanz
                }}}).then(
                    auditLog.write(AktuellesDatum +": Zum Fall "+ CaseId+ " wurde von "+ Erfasser+ " ein neuer Gegenstand der Art "+ GArt+ " hinzugefügt"),
                    res.status(201).send("Gegenstand zu Fall hinzugefügt")
                )
                break;
            case "Bild":
                const {Bez, kurzbeschreibung} = req.body
                await db.collection('Case').updateOne({_id: CaseId}, {$push:{'Beweise.0.Bilder': {
                    Bez: Bez,
                    kurzbeschreibung: kurzbeschreibung,
                }}}).then(
                    auditLog.write(AktuellesDatum +": Zum Fall "+ CaseId+ " wurde von "+ Erfasser+ " ein neues Bild namens "+ Bez+ " hinzugefügt"),
                    res.status(201).send("Bild zu Fall hinzugefügt")
                )
    
                break;
            case "Zeuge":
                const {VName, NName, Aussage, ZRelevanz} = req.body
                await db.collection('Case').updateOne({_id: CaseId}, {$push:{'Beweise.0.Zeugenaussagen': {
                    VName: VName,
                    NName: NName,
                    Aussage: Aussage,
                    Relevanz: ZRelevanz
                }}}).then(
                    auditLog.write(AktuellesDatum +": Zum Fall "+ CaseId+ " wurde von "+ Erfasser+ " eine neue Zeugenaussage von "+ VName + " "+ NName+ " hinzugefügt"),
                    res.status(201).send("Zeuge zu Fall hinzugefügt")
                )
                break;
            default:
                console.log('Ist nichts gültiges')

                break;
        }
    } catch (error) {
        console.log(error)
        res.status(404).send("Fehler bei Anlage eines Beweises aufgetreten")
    }
})

router.post('/:Aktenzeichen/Verknuepfen', async (req,res) => {
    try {
        const {AKTZ, Begruendung, Erfasser} = req.body
        let AktuellesDatum = new Date()

        const CaseId = req.params.Aktenzeichen;

        await db.collection('Case').updateOne({_id: CaseId}, {$push:{VerknuepfteFaelle: {
            Aktenzeichen: AKTZ,
            Begruendung: Begruendung,
        }}})
        .then(
            await db.collection('Case').updateOne({_id: AKTZ}, {$push:{VerknuepfteFaelle: {
                Aktenzeichen: CaseId,
                Begruendung: Begruendung,
            }}})
            .then(
                auditLog.write(AktuellesDatum +": Die Fälle "+ CaseId+ " und "+ AKTZ+ "wurden von "+ Erfasser+ " Verknüpft aufgrund von "+Begruendung +" hinzugefügt"),
                res.status(200).send("Fälle verknüpft")
            )
        )
    } catch (error) {
        console.log(error)
        res.status(404).send("Fehler bei Verknüpfung von Fällen aufgetreten")
    } 
})



export default router