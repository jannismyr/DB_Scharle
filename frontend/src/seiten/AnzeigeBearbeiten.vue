<template>

      <!-- Eingabefelder zum Bearbeiten einer Veranstaltung -->
      <div>
      <h1>Anzeige Bearbeiten</h1>
      <form @submit.prevent="updateCase" id="Form">
        <div>
          <label for="name">Name:</label>
          <input id="CaseName" v-model="Case.name" type="text" />
        </div>
        <div>
          <label for="datum">Datum:</label>
          <input id="CaseDate" v-model="Case.datum" type="date" />
        </div>
        <div>
          <label for="ort">Ort:</label>
          <input id="CaseLocation" v-model="Case.ort" type="text" />
        </div>
        <div>
          <label for="preis">Preis:</label>
          <input id="CasePrice" v-model="Case.preis" type="number" />
        </div>
        <div>
          <label for="beschreibung">Beschreibung:</label>
          <textarea id="CaseDescription" rows="4" cols="50" v-model="Case.beschreibung"></textarea>
        </div>
        <div>
          <button class="save-button" type="submit">Änderungen Speichern</button>
        </div>
      </form>
    </div>
    
</template>

<script>
export default {
    name: 'AnzeigeBearbeiten',
    data() {
        return {
            Case: {
                name: '',
                datum: '',
                ort: '',
                preis: '',
                beschreibung: ''
            }
        };
    },

};
</script>

