<template>
    <div class="container">
       <div class="box">
          <!-- Anzeige der Details der Anzeige -->
         <div>
             <h3>Tatvorwurf: {{ Tat }}</h3>
             <h4>Datum: {{ new Date(Datum).toLocaleDateString() + " " +new Date(Datum).toLocaleTimeString()}}</h4>
            
   
   
         <!--<router-link :to="`/detailansicht/${veranstaltungId}`">
           <button class="detail-button">Veranstaltung näher anzeigen</button>
         </router-link>
        
         <p>Veranstaltung ID: {{ veranstaltungId }}</p>-->
         </div>
       </div>
   
     </div>
   </template>
   
   <script>
     import axios from 'axios';
     export default {
       name: "AnzeigeKomp",
       props:{
         Tat: String,
         Datum: String
       },
       data() {
           return{
             Faelle: [],
           }
       },
       methods: {
       /*async deleteVeranstaltung() {
         try {
           // `veranstaltungId` wird als Prop übergeben
           await axios.delete(`/api/veranstaltungen/${this.veranstaltungId}`);
           window.location.reload();        
         } catch (error) {
           console.error("Fehler beim Löschen der Veranstaltung", error);
         }
       },*/
       }
     };
   </script>