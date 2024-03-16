import { client } from '../db.mjs'
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../data.mjs';
import dotenv from 'dotenv';

dotenv.config();



const router = express.Router()
const db = client.db('Test_Jannis');

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

    const {Id, benutzername, vorname, nachname, passwort, rolle} = req.body

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
        res.status(201).send('User hinzugefügt')
    )
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
        const userId = req.params.Id; // Achte darauf, dass dies zu params.id geändert wurde
        console.log(userId);

        const users = await db.collection('User').findOne({ _id: userId });

        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


router.route('/prod/erstellen')
.post(async (req,res) => {
const saltRounds = 10
    Users.Users.forEach(element => {
        console.log(element)
        element.Passwort = bcrypt.hashSync(element.Passwort, saltRounds);
    });

    console.log(Users.Users)
    await db.collection('User').insertMany(Users.Users)
    res.status(201).send('Alle User angemeldet')
})


export default router