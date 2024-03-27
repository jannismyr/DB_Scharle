<template>
    <input type="text" @keyup="$emit('GeoDaten',Geo)" class="Eingabe" v-model="Geo.Tatort" placeholder="Tatort" required>
    <input type="text" @keyup="$emit('GeoDaten',Geo)" class="Eingabe" v-model="Geo.Bundesland" placeholder="Bundesland" required>
    <input type="text" @keyup="$emit('GeoDaten',Geo)" class="Eingabe" v-model="Geo.Landkreis" placeholder="Landkreis" required>
    <input type="text" @keyup="$emit('GeoDaten',Geo)" class="Eingabe" v-model="Geo.Ort" placeholder="Ort" required>
</template>

<script>
export default {
    data(){
        return {
            Geo:{
                Tatort: this.Tatort,
                Bundesland: this.Bundesland,
                Landkreis: this.Landkreis,
                Ort: this.Ort,
            }
        }
    },
    props:{
        Tatort: String,
        Bundesland: String,
        Landkreis: String,
        Ort:String
    }
}
</script>

<style scoped>
.Eingabe{
  padding: 1rem;
  width: 60%;
}
</style>