<template>
    <input type="text" @keyup="$emit('ZeugeDaten',Zeuge)" class="Eingabe" v-model="Zeuge.VName" placeholder="Vorname">
    <input type="text" @keyup="$emit('ZeugeDaten',Zeuge)" class="Eingabe" v-model="Zeuge.NName" placeholder="Nachname">
    <input type="text" @keyup="$emit('ZeugeDaten',Zeuge)" class="Eingabe" v-model="Zeuge.Aussage" placeholder="Aussage">
    <input type="text" @keyup="$emit('ZeugeDaten',Zeuge)" class="Eingabe" v-model="Zeuge.Relevanz" placeholder="Relevanz">

</template>

<script>
export default {
    name:'ZeugeComp',
    data(){
        return {
            Zeuge:{
                VName: this.VName,
                NName: this.NName,
                Aussage: this.Aussage,
                Relevanz: this.Relevanz,
            }
        }
    },
    props:{
        VName: String,
        NName: String,
        Aussage: String,
        Relevanz: String,
    }
}
</script>

<style scoped>

</style>