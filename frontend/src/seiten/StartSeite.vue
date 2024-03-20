<template>
    <div>
       <h1>Hello World</h1>
       <div>

        <addBeschreibung/>


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

export default {
    name: 'StartSeite',
    components: {
    AnzeigeKomp,
    addBeschreibung,
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
    if (!sessionStorage.getItem('Nutzer'))
    {
      window.location.replace('/login')
    }
  }
};
</script>