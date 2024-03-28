<template>
  <div v-if="Fall">

  <div>
    <form name="Anzeigenerfassung" @submit.prevent="false">
      <div class="button-container">
        <Tabs :tabs="tabs">
          <template #Allgemein>
            <div>
              <GeneralData @General-Daten="GetGeneralData"
              :Tat ="Fall.Tatvorwurf"
              :Tatzeit="Fall.Tatzeit"/>
            </div>
          </template>
          <template #Opfer>
            <div>
                <VictimData @Opfer-Daten="GetVictim"
                :Vorname="Fall.Opfer.Vorname"
                :Nachname="Fall.Opfer.Nachname"
                :Adresse="Fall.Opfer.Adresse"
                :Ausweisnummer="Fall.Opfer.Ausweisnummer"
                :Telefonnummer="Fall.Opfer.Telefonnummer"/>
            </div>
          </template>
          <template #Täter>
            <div>
              <PerpetratorData @Taeter-Daten="GetPerpetrator"
              :Vorname="Fall.Taeter.Vorname"
              :Nachname="Fall.Taeter.Nachname"
              :Ausweisnummer="Fall.Taeter.Ausweisnummer" />
            </div>
          </template>
          <template #Geo>
            <div>
              <GeoData @Geo-Daten="GetGeoData"
              :Tatort="Fall.Ort.Tatort"
              :Bundesland="Fall.Ort.Bundesland"
              :Landkreis="Fall.Ort.Landkreis"
              :Ort="Fall.Ort.Ort"/>
            </div>
          </template>
        </Tabs>
      </div>
    <button type="submit" class="SubmitButton" @click="submitForm">Hier Änderung bestätigen</button>
    </form>
  </div>
  </div>
  

</template>

<script>
import axios from 'axios'

import Tabs from '../components/AnzeigeErstellen/Tabs/TestTabsComp.vue';

import GeneralData from '../components/AnzeigeErstellen/Comps/GeneralData.vue'
import VictimData from '../components/AnzeigeErstellen/Comps/VictimData.vue'
import PerpetratorData from '../components/AnzeigeErstellen/Comps/PerpetratorData.vue'
import GeoData from '../components/AnzeigeErstellen/Comps/GeoData.vue'


export default {
name: 'App',
components: {
  Tabs,
  VictimData,
  PerpetratorData,
  GeoData,
  GeneralData
},
methods:{
  GetGeneralData(General){
    this.General = General
  },
  GetVictim(Opfer){
    this.Victim = Opfer
  },
  GetPerpetrator(Taeter){
    this.Taeter = Taeter
  },
  GetGeoData(Geo){
    this.Geo = Geo
  },

  submitForm(){
      axios.patch(`/case/${this.Aktenzeichen}`, {
        Update:{
        Tatvorwurf: this.General.Tat,
        Tatzeit: this.General.Tatzeit,
        Opfer: {
          Vorname: this.Victim.Vorname,
          Nachname: this.Victim.Nachname,
          Ausweisnummer: this.Victim.Ausweisnummer,
          Adresse: this.Victim.Adresse,
          Telefonnummer: this.Victim.Telefonnummer
        },
        Taeter: {
          Vorname: this.Taeter.Vorname,
          Nachname: this.Taeter.Nachname,
          Ausweisnummer: this.Taeter.Ausweisnummer
        },
        Ort:{
          Bundesland: this.Geo.Bundesland,
          Landkreis: this.Geo.Landkreis,
          Ort: this.Geo.Ort, 
          Tatort: this.Geo.Tatort
        }
      }
      }).then(alert("Fall aktualisiert"),)
    }
},
data() {
  return {
    tabs: [
      {
        id: 'Allgemein',
        title: 'Allgemeine Daten',
        active: false,
      },
      {
        id: 'Opfer',
        title: 'Opfer',
        active: true,
      },
      {
        id: 'Täter',
        title: 'Täter',
        active: false,
      },
      {
        id: 'Geo',
        title: 'Geografische Daten',
        active: false,
      },
      
    ],
    General:{
      Tatzeit: null,
      Tat: null
    },
    Victim: null,
    Taeter: null,
    Geo: null,
    Fall: null,
    Aktenzeichen: this.$route.params.Aktenzeichen
  }
},
async created(){
  await axios.get(`/case/${this.Aktenzeichen}`)
    .then( res =>{
        this.Fall = res.data

        this.General.Tatzeit = res.data.Tatzeit
        this.General.Tat = res.data.Tatvorwurft

        this.Taeter = res.data.Taeter
        this.Victim = res.data.Opfer
        this.Geo = res.data.Ort
    })
  },
};
</script>

<style>
.button-container {
display: flex;
justify-content: center;
margin-top: 2rem;
height: 55vh;
}
.SubmitButton {
margin-top: 3rem;
padding: 1rem;
}

</style>

