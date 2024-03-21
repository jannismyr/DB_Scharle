export const Users = [
    {
        "_id": 1,
        "Benutzername": "Hoffi",
        "Vorname": "Simon",
        "Nachname": "Hofmann", 
        "Passwort": "Simon123", 
        "Rolle": "Admin"
    },
    {
        "_id": 2,
        "Benutzername": "JannisM",
        "Vorname": "Jannis",
        "Nachname": "Meyer", 
        "Passwort": "Jannis123", 
        "Rolle": "Admin"
    },
    {
        "_id": 3,
        "Benutzername": "JustusJonas",
        "Vorname": "Justus",
        "Nachname": "Jonas", 
        "Passwort": "Justus123", 
        "Rolle": "Ermittler"
    },
    {
        "_id": 4,
        "Benutzername": "MaxMuster",
        "Vorname": "Max",
        "Nachname": "Muster", 
        "Passwort": "Max123", 
        "Rolle": "Sachbearbeiter"
    },
    {
        "_id": 5,
        "Benutzername": "Lisa87",
        "Vorname": "Lisa",
        "Nachname": "Schmidt",
        "Passwort": "LisaPass123",
        "Rolle": "Sachbearbeiter"
    }
]

const Faelle = [
    /* BeispielFall für Postman body:
    {
    "Tatvorwurf": "Mord",
    "Erfasser": {
        "Erfasser_ID": 1,
        "ErfasserName": "Hofmann"
    },
    "Opfer": {
        "VNameOpfer": "Max",
        "NNameOpfer": "Mustermann",
        "AWN_Opfer": "123456789",
        "AdresseOpfer": "Musterstraße 123",
        "TelNumOpfer": "0123456789"
    },
    "Taeter":{
      "VNameTaeter": "Klaus",
      "NNameTaeter": "Schmidt",
      "AWN_Taeter": "987654321",
      "Tatort": "Hauptstraße 4",
      "Tatzeit": "2024-03-21T12:00:00",
      "Tatwaffe": "Messer"
    },
    "Ort": {
        "Bundesland": "Baden-Württemberg",
        "Landkreis": "Ostalbkreis",
        "Ort": "Aalen"
    }
}
    */
]

export const Straftaten = [
    {
        "_id": 1,
        "Name": "Mord"
    },
    {
        "_id": 2,
        "Name": "Diebstahl"
    },
    {
        "_id": 3,
        "Name": "Hass und Hetze im Internet"
    },
    {
        "_id": 4,
        "Name": "Körperverletzung"
    },
    {
        "_id": 5,
        "Name": "Beleidigung"
    },
    {
        "_id": 6,
        "Name": "Sachbeschädigung"
    },
    {
        "_id": 7,
        "Name": "Widerstand gegen Vollstreckungsbeamte"
    },
    {
        "_id": 8,
        "Name": "Unerlaubtes Entfernen vom Unfallort"
    },
    {
        "_id": 9,
        "Name": "Vortäuschen einer Straftat"
    },
    {
        "_id": 10,
        "Name": "Menschenhandel"
    },
    {
        "_id": 11,
        "Name": "Geldwäsche"
    },
    {
        "_id": 12,
        "Name": "Computerbetrug"
    },
    {
        "_id": 13,
        "Name": "Urkundenfälschung"
    },
    {
        "_id": 14,
        "Name": "Brandstiftung"
    },
    {
        "_id": 15,
        "Name": "Bestechung"
    }
]