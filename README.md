# Projekt Neue Datenbankkonzepte
***
## Inhalt
1.  [Allgemeine Informationen] (#Allgemeines)
2.  [Technologie] (#Technologie)
3.  [Installation] (#Installation)


## Allgemeines
Dies ist ein Projekt von Simon Hofmann und Jannis Meyer für das Modul Webprogrammierung an der DHBW Heidenheim. Abgabe ist am 31.03.2024.
Geschrieben wurde der Code ohne nennenswerte Vorkenntnisse mit Zuhilfenahme von Kursen auf Linkedin Learning (Vue), YouTube, den Vorlesungsunterlagen und Stackoverflow.
Zur Fehlersuche wurden auch Tools wie Github Code, ChatGPT und Google Gemini eingesetzt.

## Technologie

Abhängigkeiten

Back End:
 @babel/runtime:  Version 7.23.4
 express: Version 4.18.2

Front End:
Vue-Version: 3.4.21
@vue/cli: version 5.0.8
Vue-router: version 4.3.0 
Axios: version 1.6.8
VueX: 4.1.0


 ## Installation

MongoDB:
 1) Download und Installation von MongoDB Community Server
 2) Datenbank ausführen
 3) In Postman eine Post Anfrage an "http://127.0.0.1:8000/Daten/erstellen" senden

 Back End:
 1) cd ./back-end
 2) npm install
 3) Babel Pakete installieren: "npm install --save-dev @babel/core @babel/node @babel/preset-env @babel/cli @babel/plugin-transform-runtime"
 4) weiteres babel Paket installieren: "npm install @babel/runtime"
 5) in backend Ornder die Datei ".babelrc" erstellen und folgendes eintragen:
        {
        "presets":["@babel/preset-env"],
	       "plugins":[
	        ["@babel/plugin-transform-runtime",{
	            "regenerator":true
	        }]
	       ]
	  }
 6) Nodemon installieren: "npm install nodemon"
 7) in package.json des backends folgendes zu den Scripts hinzufügen:
     	"dev": "npx nodemon --exec npx babel-node src/server.mjs"
 8) npm install brcypt
 9) npm install fs
 10) npm install mongodb
 11) npm install cors
 12) npm install jsonwebtoken
 13) npm install dotenv;
 14) npm run dev
 --> Backend sollte auf port 8000 starten, positive Rückmeldung über Konsole

 Front End:
 1) cd ./front-end
 2) npm install
 3) npm install -g @vue/cli (ggf. Vue 3 auswählen)
 3) npm install vue-router@4
 4) npm install axios
 5) npm install vuex --save
 6) npm run serve
 --> Frontend sollte auf http://localhost:8080/ starten, positive Rückmeldung über Konsole

 
