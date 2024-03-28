<template>
    <input type="text" @keyup="$emit('GegenstandDaten',Gegenstand)" class="Eingabe" v-model="Gegenstand.GegenstandsArt" placeholder="GegenstandsArt" required>
    <input type="text" @keyup="$emit('GegenstandDaten',Gegenstand)" class="Eingabe" v-model="Gegenstand.Seriennummer" placeholder="Seriennummer">
    <input type="text" @keyup="$emit('GegenstandDaten',Gegenstand)" class="Eingabe" v-model="Gegenstand.Marke" placeholder="Marke">
    <input type="text" @keyup="$emit('GegenstandDaten',Gegenstand)" class="Eingabe" v-model="Gegenstand.Relevanz" placeholder="Relevanz">
</template>

<script>
export default {
    name:'GegenstandComp',
    data(){
        return {
            Gegenstand:{
                GegenstandsArt: this.GegenstandsArt,
                Seriennummer: this.Seriennummer,
                Marke: this.Marke,
                Relevanz: this.Relevanz,
            }
        }
    },
    props:{
        GegenstandsArt: String,
        Seriennummer: String,
        Marke: String,
        Relevanz: String,
    }

}
</script>

<style scoped>

</style>