<template>
    <div>
       <div>
        <Suchleiste @Suche-Fall="Fallsuche"/>
        <br><br><br><br>
        
        <div class="Grid" v-if="AlleFaelle">
          <AnzeigeKomp @click="Verknuepfen(option._id)" v-for="(option,index) in gueltigeFaelle" :key="index"
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
import AnzeigeKomp from '../components/VerknuepfungKomp.vue'


export default {
    name: 'StartSeite',
    components: {
      Suchleiste,
      AnzeigeKomp,
    },
    computed:{
        gueltigeFaelle(){
            return this.AlleFaelle.filter((Fall)=> Fall._id !== this.Aktenzeichen1)
        }
    },
    data() {
        return {
            AlleFaelle: null,
            Aktenzeichen1: this.$route.params.Aktenzeichen
        };
    },
    methods: {
      async Fallsuche(Suche){
        await axios.get(`/case/Suche?Suche=${Suche}`)
        .then(result => {
          this.AlleFaelle = result.data
        })
      },
      async Verknuepfen(Aktenzeichen2){
          let Grund = prompt("Was ist der Grund für die Verknüpfung?", "")

          if (Grund !== null && Grund !== "") {
            axios.post(`/case/${this.Aktenzeichen1}/Verknuepfen`,{
                Erfasser: JSON.parse(sessionStorage.getItem('Nutzer')).BName,
                AKTZ: Aktenzeichen2,
                Begruendung: Grund
            })
            .then(
                alert("Verknüepfung hergestellt")
            )
          } else {
            
          }

      }
    },
    mounted() {
    },
    created(){
      if (!sessionStorage.getItem('Nutzer'))
    {
      window.location.replace('/login')
    }
    else{
      axios.get('/case')
      .then(result => {
        this.AlleVeranstaltungen = result.data
      })
    }
  }
};
</script>

<style scoped>
.Grid{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>