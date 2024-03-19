<template>
    <form id="Form">
        
            <input type="text" v-model="name" placeholder="Name">

            <input type="text" v-model="address" placeholder="Adresse">

            <input type="text" v-model="phoneNumber" placeholder="Telefonnummer">

        <button type="submit" @click="addPersoenlicheDaten">Hinzufügen</button>
    </form>
</template>


<script>
export default {
    name: "addPersoenlicheDaten",
    data() {
        return {
            name: "",
            address: "",
            phoneNumber: ""
        }
    }
}
</script>