<template>
    <div>
       <div>
        <Suchleiste @Suche-Fall="Fallsuche"/>
        <br><br><br><br>
        <div class="Grid" v-if="AlleVeranstaltungen">
          <AnzeigeKomp v-for="(option,index) in AlleVeranstaltungen" :key="index"
            :Aktenzeichen="option._id"
            :Tat="option.Tatvorwurf"
            :Datum="option.Tatzeit"
            :VNameOpfer="option.Opfer.Vorname"
            :NNameOpfer="option.Opfer.Nachname"
            :VNameTaeter="option.Taeter.Vorname"
            :NNameTaeter="option.Taeter.Nachname"
            :Bundesland="option.Ort.Bundesland"
            />
        </div>
       </div>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import Suchleiste from '../components/Sonstiges/Suchleiste.vue'
import AnzeigeKomp from '../components/AnzeigeKomp.vue'



export default {
    name: 'StartSeite',
    components: {
      Suchleiste,
      AnzeigeKomp,
  },
  data() {
      return {
          AlleVeranstaltungen: null
      };
  },
  methods: {
    async Fallsuche(Suche){
      await axios.get(`/case/Suche?Suche=${Suche}`)
      .then(result => {
        this.AlleVeranstaltungen = result.data
      })
    }
      // Hier kommen die Methoden der Seite
  },
  mounted() {
      // Hier können Sie Code ausführen, der nach dem Rendern der Seite ausgeführt werden soll
  },
  created(){
  /*  if (!sessionStorage.getItem('Nutzer'))
    {
      window.location.replace('/login')
    }
  }*/
},
}
</script>

<style scoped>
.Grid{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>