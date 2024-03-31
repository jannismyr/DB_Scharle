<template>
 <div class="container">
    <div class="box">
      <RouterLink class="Router" :to="`/detailansicht/${Aktenzeichen}`"><div>
          <h1>Aktenzeichen: {{ Aktenzeichen }}</h1>
          <h3>Tatvorwurf: {{ Tat }}</h3>
          <h4>Datum: {{ new Date(Datum).toLocaleDateString() + " " +new Date(Datum).toLocaleTimeString()}}</h4>
          <h4>Opfer: {{ VNameOpfer + " "+ NNameOpfer }}</h4>
          <h4>Täter: {{ VNameTaeter + " "+ NNameTaeter }}</h4>
          <h4>Bundesland: {{ Bundesland }}</h4>
      </div>
    </RouterLink>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "AnzeigeKomp",
    props:{
      Tat: String,
      Datum: String,
      VNameOpfer : String,
      NNameOpfer: String,
      VNameTaeter: String,
      NNameTaeter: String,
      Bundesland: String,
      Aktenzeichen: String
    },
    data() {
        return{
          Faelle: [],
        }
    },
    methods: {
    async deleteVeranstaltung() {
      try {
        // `veranstaltungId` wird als Prop übergeben
        await axios.delete(`/api/veranstaltungen/${this.veranstaltungId}`);
        window.location.reload();        
      } catch (error) {
        console.error("Fehler beim Löschen der Veranstaltung", error);
      }
    },
    }
  };
</script>

<style scoped>
.Router{
  color: rgb(53, 53, 53);
  text-decoration: none;
}
.container {
  display: flex;
  justify-content: center;
}

.box {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 3rem;
  max-width: 31.25rem; 
  transition: box-shadow 0.3s ease-in-out; 
}
.box:hover{
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3); 
  cursor: pointer;
}
.heading {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.details {
  margin-bottom: 2rem;
}

.detail {
  margin: 0.5rem 0;
}

.detail-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  cursor: pointer;
}

.detail-button:hover {
  background-color: #0056b3;
}
</style>