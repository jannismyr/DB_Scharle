<template>
    <input type="text" @keyup="emitGeoData" class="Eingabe" v-model="Geo.Tatort" placeholder="Tatort" required>
    <select @change="emitGeoData" class="Eingabe" v-model="Geo.Bundesland" required>
        <option value="" disabled selected>Bundesland wählen</option>
        <option value="Baden-Württemberg">Baden-Württemberg</option>
        <option value="Bayern">Bayern</option>
        <option value="Berlin">Berlin</option>
        <option value="Brandenburg">Brandenburg</option>
        <option value="Bremen">Bremen</option>
        <option value="Hamburg">Hamburg</option>
        <option value="Hessen">Hessen</option>
        <option value="Mecklenburg-Vorpommern">Mecklenburg-Vorpommern</option>
        <option value="Niedersachsen">Niedersachsen</option>
        <option value="Nordrhein-Westfalen">Nordrhein-Westfalen</option>
        <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
        <option value="Saarland">Saarland</option>
        <option value="Sachsen">Sachsen</option>
        <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
        <option value="Schleswig-Holstein">Schleswig-Holstein</option>
        <option value="Thüringen">Thüringen</option>
    </select>
    <input type="text" @keyup="emitGeoData" class="Eingabe" v-model="Geo.Landkreis" placeholder="Landkreis" required>
    <input type="text" @keyup="emitGeoData" class="Eingabe" v-model="Geo.Ort" placeholder="Ort" required>

    <h4>Es müssen alle Felder ausgefüllt werden</h4>
</template>

<script>
export default {
    data() {
        return {
            Geo: {
                Tatort: this.Tatort || '',
                Bundesland: this.Bundesland || '',
                Landkreis: this.Landkreis || '',
                Ort: this.Ort || '',
            }
        }
    },
    props: {
        Tatort: String,
        Bundesland: String,
        Landkreis: String,
        Ort: String
    },
    methods: {
        emitGeoData() {
            this.$emit('GeoDaten', this.Geo);
        }
    }
}
</script>

<style scoped>
.Eingabe {
  padding: 1rem;
  width: 60%;
  margin: 0.5rem 0; 
  box-sizing: border-box; 
}
</style>
