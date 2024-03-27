<template>
    <input type="text" @keyup="$emit('OpferDaten',Opfer)" class="Eingabe" v-model="Opfer.Vorname" placeholder="Vorname" required>
    <input type="text" @keyup="$emit('OpferDaten',Opfer)" class="Eingabe" v-model="Opfer.Nachname" placeholder="Nachname" required>
    <input type="text" @keyup="$emit('OpferDaten',Opfer)" class="Eingabe" v-model="Opfer.Adresse" placeholder="Adresse" required>
    <input type="text" @keyup="$emit('OpferDaten',Opfer)" class="Eingabe" v-model="Opfer.Ausweisnummer" placeholder="Ausweisnummer">
    <input type="text" @keyup="$emit('OpferDaten',Opfer)" class="Eingabe" v-model="Opfer.Telefonnummer" placeholder="Telefonnummer"> 
</template>

<script>
export default {
    data(){
        return {
            Opfer:{
                Vorname: this.Vorname,
                Nachname: this.Nachname,
                Adresse: this.Adresse,
                Ausweisnummer: this.Ausweisnummer,
                Telefonnummer: this.Telefonnummer
            }
        }
    },
    props:{
        Vorname: String,
        Nachname: String,
        Adresse: String,
        Ausweisnummer: String,
        Telefonnummer: String
    }
}
</script>

<style scoped>
.Eingabe{
  padding: 1rem;
  width: 60%;
}
</style>