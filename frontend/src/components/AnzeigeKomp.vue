<template>
 <div class="container">
    <div class="box">
       <!-- Anzeige der Details der Veranstaltung -->
      <div>
          <h3>Name: {{ Name }}</h3>
          <h4>Datum: {{ formatDatum(Datum) }}</h4>
          <h4>Ort: {{ Ort }}</h4>
          <h4>Preis: {{ Preis }}</h4>
          <h4>Beschreibung: {{ Beschreibung }}</h4>
          <h4>Genehmigung: {{ Genehmigung }}</h4>

      <button class="delete-button" @click="deleteVeranstaltung">Veranstaltung Löschen</button>
      <p></p>

      <router-link :to="`/detailansicht/${veranstaltungId}`">
        <button class="detail-button">Veranstaltung näher anzeigen</button>
      </router-link>
     
      <p>Veranstaltung ID: {{ veranstaltungId }}</p>
      </div>
    </div>

  </div>
    </template>
    
    
    <script>

    import axios from 'axios';

    export default {
        name: "AnzeigeKomp",
        props:{
          Name:String,
          Datum:String,
          Ort:String,
          Preis:String,
          Beschreibung:String,
          Genehmigung:Boolean,
          veranstaltungId:String,
        },
        data() {
            return{
              AlleVeranstaltungen: [],
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
    formatDatum(datumString) {
        // Überprüfung, ob das Datum im Format YYYY-MM-DD vorliegt
        const matchYYYYMMDD = datumString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (matchYYYYMMDD) {
          return `${matchYYYYMMDD[3]}.${matchYYYYMMDD[2]}.${matchYYYYMMDD[1]}`;
        }

        // Überprüfung, ob das Datum im Format DD-MM-YYYY vorliegt
        const matchDDMMYYYY = datumString.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
        if (matchDDMMYYYY) {
          // Verwenden Sie toLocaleDateString, um das Datum im lokalen Format anzuzeigen
          const umgeformtesDatum = new Date(`${matchDDMMYYYY[3]}-${matchDDMMYYYY[2]}-${matchDDMMYYYY[1]}`);
          return umgeformtesDatum.toLocaleDateString();
        }

        return 'Ungültiges Datum';
      },
  }
};
</script>