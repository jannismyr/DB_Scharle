<template>

<div>
    <form id="Form">
        <input type="text" v-model="fallName" placeholder="Trage hier den Namen für den Fall ein">
        <button type="submit" @click="addFallName">Hinzufügen</button>
    </form>
</div>

</template>


<script>
export default {
    name: "addFallname",
    data() {
        return{
                fallName: "",
        }
    }
}
</script>