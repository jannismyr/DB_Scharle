<template>
    <select @change="$emit('GeneralDaten',General)" v-model="General.Tat" class="Eingabe">
        <option disabled selected value="alle">Tatvorwurf auswählen</option>
        <option v-for="(option,index) in Taten" :key="index" :value="option.Name">
          {{ option.Name }}
        </option>
    </select>
    <input type="datetime-local" @keyup="$emit('GeneralDaten',General)" class="Eingabe" id="DateTime" v-model="General.Tatzeit" placeholder="Tatzeit" required >


</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            General:{
                Tat: null,
                Tatzeit: null,
            },
            Taten: null
        }
    },
    async created(){
        await axios.get('/crime')
        .then(result => {
            this.Taten = result.data
        })
    }
}
</script>

<style scoped>
#DateTime{
    width: 100%;
    padding: 1rem;
}
.Eingabe{
  padding: 0.5rem;
  width: 60%;
  margin-bottom: 1rem;
}
</style>