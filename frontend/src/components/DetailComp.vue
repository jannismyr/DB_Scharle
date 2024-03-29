<template>
  <div class="container">
    <div class="box">
      <!-- Anzeige der Details der Anzeige -->
        <div class="Box">
          <h1>Aktenzeichen: {{ Aktenzeichen }}</h1>
          <h3>Tatvorwurf: {{ Tat }}</h3>
          <h4>Datum: {{ formattedDate }}</h4>
          <h4>Opfer: {{ VNameOpfer + " " + NNameOpfer }}</h4>
          <h4>Täter: {{ VNameTaeter + " " + NNameTaeter }}</h4>
          <h4>Bundesland: {{ Bundesland }}</h4>
        </div>

        <h1>Beweise</h1>

        <div class="Grid" v-if="Beweise">
          <div v-if="Beweise[0].Gegenstaende" class="BeweisBox">
          <h1>Gegenstände</h1>
          <ul v-for="(gegenstand,index) in Beweise[0].Gegenstaende" :key="index">
            <li>
              <h3>Art: {{ gegenstand.GegenstandsArt }}</h3>
              <h4>Seriennummer:  {{ gegenstand.Seriennummer }}</h4>
              <h5>Marke: {{gegenstand.Marke}}</h5>
              <p>Relevanz:  {{gegenstand.Relevanz}}</p>
            </li>
          </ul>
          </div>
          <div v-if="Beweise[0].Bilder" class="BeweisBox">
            <h1>Bild</h1>
            <ul v-for="(bild,index) in Beweise[0].Bilder" :key="index">
              <li>
                <h4>Bezeichnung: {{ bild.Bez }}</h4>
                <p>Beschreibung: {{ bild.kurzbeschreibung }}</p>
              </li>
            </ul>
          </div>
          <div v-if="Beweise[0].Zeugen" class="BeweisBox">
          <h1>Zeugen</h1>
            <ul v-for="(zeuge,index) in Beweise[0].Zeugen" :key="index">
              <li>
                <h2>Vorname: {{ zeuge.VName }}</h2>
                <h2>Nachname: {{zeuge.NName}}</h2>

                <p>Aussage: {{zeuge.Aussage}}</p>
                <p>Relevanz: {{zeuge.Relevanz}}</p>
              </li>
            </ul>
          </div>
        </div>

        <br><br>

        <h1>Verknüpfte Fälle:</h1>
        <div class="Grid" v-if="VerknFaelle">
          <VerknFaelleInfo v-for="(Fall,index) in VerknFaelle" :key="index"
          :Aktenzeichen="Fall.Aktenzeichen"
          :Begruendung="Fall.Begruendung"/>
        </div>

        <div class="Buttons">
          <RouterLink class="Router" :to="`/bearbeiten/${Aktenzeichen}`"><button> Fall Ändern</button></RouterLink>
          <RouterLink class="Router" :to="`/verknuepfen/${Aktenzeichen}`"><button> Fall Verknüpfen</button></RouterLink>
          <RouterLink class="Router" :to="`/beweise/${Aktenzeichen}`"><button> Beweise hinzufügen</button></RouterLink>
        </div>
    </div>
  </div>
</template>

<script>
import VerknFaelleInfo from './DarstellungAnzeigen/VerknFaelleInfo.vue';

export default {
  name: "AnzeigeKomp",
  components:{
    VerknFaelleInfo
  },
  props: {
    Tat: String,
    Datum: String,
    VNameOpfer: String,
    NNameOpfer: String,
    VNameTaeter: String,
    NNameTaeter: String,
    Bundesland: String,
    Aktenzeichen: String,
    VerknFaelle: Array,
    Beweise: Array
  },
  computed: {
    formattedDate() {
      const date = new Date(this.Datum);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
  }
};
</script>

<style scoped>
.Grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px; 
}

.Grid ul {
  display: flex;
  flex-direction: column; 
  align-items: center;
  padding: 0;
}

.Grid li {
  margin: 10px 0; 
  border: 1px solid rgb(148, 148, 148);
  border-radius: 5px; 
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); 
  padding: 10px;
  width: 90%; 
}

.Router {
  margin: 1rem;
  text-decoration: none; 
}

.Buttons button {
  padding: 0.5rem;
  margin: 0.5rem; 
  border: none; 
  background-color: #333; 
  color: white;
  border-radius: 5px; 
  cursor: pointer;
}

.Buttons button:hover {
  background-color: #626161; 
}

.Box {
  border: 1px solid #000; 
  padding: 15px;
  margin: 10px; 
  background-color: #f9f9f9; 
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
  border-radius: 5px; 
}

.BeweisBox {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
</style>
