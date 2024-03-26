<template>
    <div>
       <div>
        <Suchleiste @Suche-Fall="Fallsuche"/>
        <br><br><br><br>
        <!--<addBeschreibung/>
        <br><br>
        <addAdresse/>
        <br><br>
        <addBeschreibung/>
        <br><br>
        <addBilder/>
        <br><br>
        <addKennzeichen/>
        <br><br>
        <addPersoenlicheDaten/>
        <br><br>
        <addTatort/>
        <br><br>
        <addVerdaechtige/>
        <br><br>
        <addZeugen/>
        <br><br>
        <addFallName/>-->
        
        <div v-if="AlleVeranstaltungen">
          
            <AnzeigeKomp v-for="(option,index) in AlleVeranstaltungen" :key="index"
            :Tat="option.Tatvorwurf"
            :Datum="option.Tatzeit"
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
/*import addBeschreibung from '@/comp_Fallansicht/addBeschreibung.vue';
import addAdresse from '@/comp_Fallansicht/addAdresse.vue';
import addPersoenlicheDaten from '@/comp_Fallansicht/addPersoenlicheDaten.vue';
import addBilder from '@/comp_Fallansicht/addBilder.vue';
import addFallName from '@/comp_Fallansicht/addFallname.vue';
import addKennzeichen from '@/comp_Fallansicht/addKennzeichen.vue';
import addTatort from '@/comp_Fallansicht/addTatort.vue';
import addVerdaechtige from '@/comp_Fallansicht/addVerdaechtige.vue';
import addZeugen from '@/comp_Fallansicht/addZeugen.vue';*/



export default {
    name: 'StartSeite',
    components: {
      Suchleiste,
      AnzeigeKomp,
    /*addBeschreibung,
    addAdresse,
    addPersoenlicheDaten,
    addBilder,
    addKennzeichen,
    addTatort,
    addVerdaechtige,
    addZeugen,
    addFallName,
    */
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