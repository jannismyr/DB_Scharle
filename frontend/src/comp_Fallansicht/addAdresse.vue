<template>

<form id="Form">
    <input type="text" v-model="strasse" placeholder="Strasse">

    <input type="text" v-model="hausnummer" placeholder="Hausnummer">

    <input type="text" v-model="postleitzahk" placeholder="Postleitzahl">

    <input type="text" v-model="stadt" placeholder="Stadt">

    
    <button type="submit" @click="saveAddress">Hinzufügen</button>
</form>

</template>


<script>
export default {
    name: "addAdresse",
    data() {
        return{
            strasse: "",
            hausnummer: "",
            stadt: "",
            postleitzahk: "",
        }
    }
}
</script>