<template>
    <input type="text" @keyup="$emit('BildDaten',Bild)" class="Eingabe" v-model="Bild.Bez" placeholder="Bez" required>
    <input type="text" @keyup="$emit('BildDaten',Bild)" class="Eingabe" v-model="Bild.kurzbeschreibung" placeholder="kurzbeschreibung" required>

</template>

<script>
export default {
    name:'BildComp',
    data(){
        return {
            Bild:{
                Bez: this.Bez,
                kurzbeschreibung: this.kurzbeschreibung,
            }
        }
    },
    props:{
        Bez: String,
        kurzbeschreibung: String,
    }

}
</script>

<style scoped>

</style>