<template>
    <div>
       <h1>Hello World</h1>
       <div>

        <addBeschreibung/>
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
        <addFallName/>
        


        <div>
          <AnzeigeKomp v-for="Fall in AlleVeranstaltungen"
            :key="Fall.id"
            :Name="Fall.name"
            :Datum="Fall.datum"
            :Ort="Fall.ort"
            :Preis="Fall.preis"
            :Beschreibung="Fall.beschreibung"
            :Genehmigung="Fall.genehmigung"
            :fallId="Fall.id"
          />
          <br>
        </div>
       </div>
    </div>
</template>

<script>
import AnzeigeKomp from '../components/AnzeigeKomp.vue'
import addBeschreibung from '@/comp_Fallansicht/addBeschreibung.vue';
import addAdresse from '@/comp_Fallansicht/addAdresse.vue';
import addPersoenlicheDaten from '@/comp_Fallansicht/addPersoenlicheDaten.vue';
import addBilder from '@/comp_Fallansicht/addBilder.vue';
import addFallName from '@/comp_Fallansicht/addFallName.vue';
import addKennzeichen from '@/comp_Fallansicht/addKennzeichen.vue';
import addTatort from '@/comp_Fallansicht/addTatort.vue';
import addVerdaechtige from '@/comp_Fallansicht/addVerdaechtige.vue';
import addZeugen from '@/comp_Fallansicht/addZeugen.vue';



export default {
    name: 'StartSeite',
    components: {
    AnzeigeKomp,
    addBeschreibung,
    addAdresse,
    addPersoenlicheDaten,
    addBilder,
    addKennzeichen,
    addTatort,
    addVerdaechtige,
    addZeugen,
    addFallName,
  },
  data() {
      return {
          
      };
  },
  methods: {
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