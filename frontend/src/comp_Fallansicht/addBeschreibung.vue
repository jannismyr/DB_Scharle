<template>

<div>
    <form id="Form">
        <textarea v-model="beschreibung" placeholder="Füge hier eine Beschreibung der Tat ein"></textarea>
        <button type="submit" @click="addBeschreibung">Hinzufügen</button>
    </form>
</div>

  </template>
  
  
  <script>
  export default {
      name: "addBeschreibung",
      data() {
          return{
                beschreibung: "",
          }
      }
  }
  </script>