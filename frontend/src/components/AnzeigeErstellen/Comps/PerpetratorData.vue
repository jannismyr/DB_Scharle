<template>
    <input type="text" @keyup="$emit('TaeterDaten',Taeter)" class="Eingabe" v-model="Taeter.Vorname" placeholder="Vorname" required>
    <input type="text" @keyup="$emit('TaeterDaten',Taeter)" class="Eingabe" v-model="Taeter.Nachname" placeholder="Nachname" required>
    <input type="text" @keyup="$emit('TaeterDaten',Taeter)" class="Eingabe" v-model="Taeter.Ausweisnummer" placeholder="Ausweisnummer">

    <h4>Es müssen die Felder "Vorname" und "Nachname" ausgefüllt werden</h4>
</template>

<script>
export default {
    data(){
        return {
            Taeter:{
                Vorname: this.Vorname,
                Nachname: this.Nachname,
                Ausweisnummer: this.Ausweisnummer,
            }
        }
    },
    props:{
        Vorname: String,
        Nachname: String,
        Ausweisnummer: String,
    }
}
</script>

<style scoped>
.Eingabe{
  padding: 1rem;
  width: 60%;
}
</style>