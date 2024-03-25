<template>

    <h1>Hier werden die Daten spezifisch nach Tatart dargestellt</h1>
</template>

<script>
export default {
    name:'DatenEingabe',
    data(){
        return {
            Tat: this.$route.params.Tat
        }
    }
}
</script>