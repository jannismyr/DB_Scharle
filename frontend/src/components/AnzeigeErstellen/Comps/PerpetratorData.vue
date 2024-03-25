<template>
    <input type="text" @keyup="$emit('TaeterDaten',Taeter)" class="Eingabe" v-model="Taeter.Vorname" placeholder="Vorname" required>
    <input type="text" @keyup="$emit('TaeterDaten',Taeter)" class="Eingabe" v-model="Taeter.Nachname" placeholder="Nachname" required>
    <input type="text" @keyup="$emit('TaeterDaten',Taeter)" class="Eingabe" v-model="Taeter.Ausweisnummer" placeholder="Ausweisnummer">
</template>

<script>
export default {
    data(){
        return {
            Taeter:{
                Vorname: null,
                Nachname: null,
                Ausweisnummer: null,
            }
        }
    }
}
</script>

<style scoped>
.Eingabe{
  padding: 1rem;
  width: 60%;
}
</style>