import { client } from '../db.mjs'
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs'

dotenv.config();

const router = express.Router()
const db = client.db('Test_Jannis');

let auditLog = fs.createWriteStream('./audit.txt', {
    flags: 'a'
})

function generateAccessToken(nutzername) {
    return jwt.sign({ nutzername }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

/*function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}*/

router.route('/')
.get(async (req,res) => {
    const users = await db.collection('User').find({}).toArray();
    res.json(users)
})
.post(async (req,res) => {

    try {
        const {Rolle, Erfasser} = req.body
        let AktuellesDatum = new Date()

        const {Id, benutzername, vorname, nachname, passwort, rolle} = req.body

        if (Rolle === "Admin"){
            const saltRounds = 10;
            NewPassword = bcrypt.hashSync(passwort, saltRounds);
        
            await db.collection('User').insertOne({
                _id: Id,
                Benutzername: benutzername,
                Vorname: vorname,
                Nachname: nachname, 
                Passwort: NewPassword, 
                Rolle: rolle
            })
            .then(
                auditLog.write(AktuellesDatum + " Es wurde der Benutzer "+ Id+" "+ benutzername + " von "+ Erfasser + " hinzugefügt \n" ),
                res.status(201).send('User hinzugefügt')
            )
        }
        else{
            res.status(403).send("Nicht für diese Aktion authorisiert");
        }
    } catch (error) {
        console.log(error.message)
    }
})
.delete(async (req,res) => {
    try {
    
    const {Rolle, Erfasser} = req.body

    let AktuellesDatum = new Date()

    if (Rolle === "Admin") {
        await db.collection('User').deleteMany({})

        auditLog.write(AktuellesDatum + " Es wurden alle Benutzer von "+ Erfasser + " gelöscht \n" )
        res.status(200).send("Alle Nutzer gelöscht");
        
    } else {
        res.status(403).send("Nicht für diese Aktion authorisiert");
    }
    } catch (error) {
        console.log(error.message)
    }
    
})

router.post('/login', async (req,res) => {
    const { benutzername, passwort } = req.body;

    try {
        const user = await db.collection('User').findOne({ Benutzername: benutzername });

        if (user) {
            const validPassword = await bcrypt.compare(passwort, user.Passwort)

            if (validPassword) {
                const token = generateAccessToken(user._id);
                res.json({
                    token,
                    Nutzer:{
                        Id: user._id,
                        BName: user.Benutzername,
                        Rolle: user.Rolle
                    }
                })
            }
        } else {
            console.log('User existiert nicht')
        }
    } catch (error) {
        console.log(error.message)
    }
})

router.route('/:Id')
.get(async (req,res) => {
    try {
        const userId = req.params.Id;
        console.log(userId);

        const user = await db.collection('User').findOne({ _id: userId });

        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})
.patch(async (req,res) =>{
    try {
        const {Rolle, Erfasser} = req.body
        let AktuellesDatum = new Date()

        if (Rolle === "Admin") {
            const body = req.body.Update
            const userId = parseInt(req.params.Id);
            const user = await db.collection('User').findOne({ _id: userId });
    
            for (const key in body) {
                if (Object.hasOwnProperty.call(user, key)) {
                    await db.collection('User').updateOne({_id: userId}, {$set:{ [key]: body[key]}})
    
                }
            }
            auditLog.write(AktuellesDatum + " Es wurden der Benutzer "+ userId+" "+ user.Benutzername + " von "+ Erfasser + " geändert \n" )
            res.status(200).send('Nutzer bearbeitet')

        } else {
            res.status(403).send("Nicht für diese Aktion authorisiert");
        }
    } catch (error) {
        console.log(error.message)
    }
})
.delete(async (req,res) => {

    try {
        const {Rolle, Erfasser} = req.body
        let AktuellesDatum = new Date()

        const userId = req.params.Id;
    
        if (Rolle === "Admin") {
            await db.collection('User').deleteOne({_id: userId})
            auditLog.write(AktuellesDatum + ": Es wurden der Benutzer "+ userId +" von "+ Erfasser + " gelöscht \n" )
            res.status(200).send("Nutzer gelöscht");
            
        } else {
            res.status(403).send("Nicht für diese Aktion authorisiert");
        }
        } catch (error) {
            console.log(error.message)
        }
})


export default router