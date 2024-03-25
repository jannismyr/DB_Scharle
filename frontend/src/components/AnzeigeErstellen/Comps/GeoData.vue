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
                Tatort: null,
                Bundesland: null,
                Landkreis: null,
                Ort: null,
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