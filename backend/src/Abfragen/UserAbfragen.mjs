import { client } from '../db.mjs'
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../data.mjs';



const router = express.Router()
const db = client.db('Test_Jannis');

function generateAccessToken(userId) {
    return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

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
    const { email, passwort } = req.body;

    try {
        const user = await db.collection('User').findOne({ _id: userId });

        if (user.rows.length >0) {
            console.log('existiert')
        } else {
            console.log('existiert nicht')
        }
    } catch (error) {
        
    }

    try {
        // Überprüfe zunächst, ob der Benutzer existiert und hole das Passwort für den Vergleich
        const userQuery = await client.query('SELECT * FROM kunde WHERE email = $1', [email]);

        if (userQuery.rows.length > 0) {
            const user = userQuery.rows[0];
            const validPassword = await bcrypt.compare(passwort, user.passwort);

            if (validPassword) {
                // Hole die nicht abgeschlossenen Auftrags-IDs, falls vorhanden

                // Generiere JWT-Token
                const token = generateAccessToken(user.kunde_id);

                // Sendet den Token und Kundendetails zurück
                res.json({
                    token,
                    
                });
            } else {
                res.status(400).json({ message: "Ungültiges Passwort" });
            }
        } else {
            res.status(400).json({ message: "Kunde nicht gefunden" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
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