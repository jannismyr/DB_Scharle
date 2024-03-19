<template>

<form id="Form">
    <input type="text" v-model="name" placeholder="Name">

    <input type="text" v-model="alter" placeholder="Alter">
   
    <button type="submit" @click="saveZeuge">Hinzufügen</button>
</form>
    
  </template>
  
  
  <script>
  export default {
      name: "addZeugen",
      data() {
          return{
            name: "",
            alter: "",
          }
      }
  }
  </script>