<template>
  <div class="container">
    <div class="box">
      <!-- Anzeige der Details der Anzeige -->
        <div>
          <h1>Aktenzeichen: {{ Aktenzeichen }}</h1>
          <h3>Tatvorwurf: {{ Tat }}</h3>
          <h4>Datum: {{ formattedDate }}</h4>
          <h4>Opfer: {{ VNameOpfer + " " + NNameOpfer }}</h4>
          <h4>Täter: {{ VNameTaeter + " " + NNameTaeter }}</h4>
          <h4>Bundesland: {{ Bundesland }}</h4>
        </div>

        <h1>Beweise</h1>

        <div class="Grid" v-if="Beweise">
          <div v-if="Beweise[0].Gegenstaende">
          <h1>Gegenstaende</h1>
          <ul v-for="(gegenstand,index) in Beweise[0].Gegenstaende" :key="index">
            <li>
              <h3>Art: {{ gegenstand.GegenstandsArt }}</h3>
              <h4>Seriennummer:  {{ gegenstand.Seriennummer }}</h4>
              <h5>Marke: {{gegenstand.Marke}}</h5>
              <p>Relevanz:  {{gegenstand.Relevanz}}</p>
            </li>
          </ul>
          </div>
          <div v-if="Beweise[0].Bilder">
            <h1>Bild</h1>
            <ul v-for="(bild,index) in Beweise[0].Bilder" :key="index">
              <li>
                <h4>Bezeichnung: {{ bild.Bez }}</h4>
                <p>Beschreibung: {{ bild.kurzbeschreibung }}</p>
              </li>
            </ul>
          </div>
          <div v-if="Beweise[0].Zeugen">
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
.Grid{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.Grid ul{
  display: flex;
  justify-content:center;
}
.Grid li{
  margin-bottom: 3rem;
  border: 1px solid rgb(148, 148, 148);
}
.Router{
  margin: 1rem;
}
.Buttons button{
  padding: 0.5rem;
}

</style>
