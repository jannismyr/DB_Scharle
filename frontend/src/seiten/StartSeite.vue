<template>
    <div>
       <h1>Hello World</h1>
       <div>

        <div class="Veranstaltungsliste">
      <VeranstaltungAllg v-for="Veranstaltung in AlleVeranstaltungen"
        :key="Veranstaltung.id"
        :Name="Veranstaltung.name"
        :Datum="Veranstaltung.datum"
        :Ort="Veranstaltung.ort"
        :Preis="Veranstaltung.preis"
        :Beschreibung="Veranstaltung.beschreibung"
        :Genehmigung="Veranstaltung.genehmigung"
        :veranstaltungId="Veranstaltung.id"
      />
      <br>
    </div>
    
       </div>
    </div>
</template>

<script>
export default {
    name: 'StartSeite',
    data() {
        return {
            // Hier kommen die Daten der Seite
        };
    },
    methods: {
        // Hier kommen die Methoden der Seite
    },
    mounted() {
        // Hier können Sie Code ausführen, der nach dem Rendern der Seite ausgeführt werden soll
    }
};
</script>