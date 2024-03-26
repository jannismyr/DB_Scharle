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
    VerknFaelle: Array
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
.Router{
  margin: 1rem;
}
.Buttons button{
  padding: 0.5rem;
}

</style>
