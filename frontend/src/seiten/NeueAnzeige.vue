<template>
    <div>
      <form name="Anzeigenerfassung" @submit.prevent="false">
        <div class="button-container">
          <Tabs :tabs="tabs">
            <template #Allgemein>
              <div>
                <GeneralData @General-Daten="GetGeneralData"/>
              </div>
            </template>
            <template #Opfer>
              <div>
                  <VictimData @Opfer-Daten="GetVictim"/>
              </div>
            </template>
            <template #Täter>
              <div>
                <PerpetratorData @Taeter-Daten="GetPerpetrator"/>
              </div>
            </template>
            <template #Geo>
              <div>
                <GeoData @Geo-Daten="GetGeoData"/>
              </div>
            </template>
          </Tabs>
        </div>
      <button type="submit" class="SubmitButton" @click="submitForm">Hier bestätigen</button>
      </form>
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
      if (this.General && this.Victim && this.Taeter && this.Geo) {
        axios.post('/case', {
          Tatvorwurf: this.General.Tat,
          Tatzeit: this.General.Tatzeit,
          Erfasser: {
            Erfasser_ID: sessionStorage.getItem('Nutzer').Id,
            ErfasserName: sessionStorage.getItem('Nutzer').BName
          },
          Opfer: {
            VNameOpfer: this.Victim.Vorname,
            NNameOpfer: this.Victim.Nachname,
            AWN_Opfer: this.Victim.Auweisnummer,
            AdresseOpfer: this.Victim.Adresse,
            TelNumOpfer: this.Victim.Telefonnummer
          },
          Taeter: {
            VNameTaeter: this.Taeter.Vorname,
            NNameTaeter: this.Taeter.Nachname,
            AWN_Taeter: this.Taeter.Ausweisnummer
          },
          Ort:{
            Bundesland: this.Geo.Bundesland,
            Landkreis: this.Geo.Landkreis,
            Ort: this.Geo.Ort, 
            Tatort: this.Geo.Tatort
          }
        }).then(alert("Formular abgesendet"),
        document.Anzeigenerfassung.reset(),
        window.location.replace(`/${this.General.Tat}`))
      } else {
        alert("Eine Seite nicht ausgefüllt")
      }
        
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
      Victim: null,
      Taeter:null,
      Geo: null,
      General: null
    };
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