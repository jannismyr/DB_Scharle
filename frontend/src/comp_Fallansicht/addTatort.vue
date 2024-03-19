<template>

<form id="Form">
    <input type="text" v-model="ueberschrift" placeholder="Name für den Tatort">

    <input type="text" v-model="strasse" placeholder="Strasse">

    <input type="text" v-model="hausnummer" placeholder="Hausnummer">

    <input type="text" v-model="postleitzahk" placeholder="Postleitzahl">

    <input type="text" v-model="stadt" placeholder="Stadt">
    
    <button type="submit" @click="saveTatortAdresse">Hinzufügen</button>
</form>

</template>


<script>
export default {
    name: "addTatort",
    data() {
        return{
            strasse: "",
            hausnummer: "",
            stadt: "",
            postleitzahk: "",
            ueberschrift: "",
        }
    }
}
</script>