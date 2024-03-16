<template>
    <div>
        <h1>Anlegen einer neuen Anzeige</h1>

<!-- Eingabefelder zum Erstellen einer Anzeige -->
   <form @submit.prevent="validateForm" id="Form">
<label for="caseName">Name:</label>
<input type="text" id="caseName" name="caseName" v-model="this.Case.Name"  ><br><br>

<label for="caseDate">Datum:</label>
<input type="date" id="caseDate" name="caseDate" v-model="this.Case.Datum" required><br><br>

<label for="caseLocation">Ort:</label>
<input type="text" id="caseLocation" name="caseLocation" v-model="this.Case.Ort"><br><br>

<label for="caseDescription">Beschreibung:</label><br>
<textarea id="caseDescription" name="caseDescription" rows="4" cols="50" v-model="this.Case.Beschreibung"></textarea><br><br>

<input type="submit"  value="Anzeige erstellen">
</form>

    </div>
</template>

<script>
// import axios from 'axios'; 

export default {
    name: 'NeueAnzeige',
    data() {
        return {
            Case: {
                Ort: '',
                Beschreibung: ''
            }
        }
    },
}
</script>
