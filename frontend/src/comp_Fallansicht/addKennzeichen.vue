<template>

<div>
    <form id="Form">
        <input type="text" v-model="kennzeichen" placeholder="Trage hier das Kennzeichen ein">
        <button type="submit" @click="addKennzeichen">Hinzufügen</button>
    </form>
</div>

  </template>
  
  
  <script>
  export default {
      name: "addKennzeichen",
      data() {
          return{
                kennzeichen: "",
          }
      }
  }
  </script>