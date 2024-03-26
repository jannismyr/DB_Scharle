<template>
    <div class="Such-container">
        <input type="text" @keyup="$emit('SucheFall',Suche)" v-model="Suche" placeholder="Suche Fälle" class="Such-eingabe">
    </div>
  </template>
    
  <script>  
  export default{
    name: "SuchLeiste",
    data(){
      return {
        Suche: '',
      }
    },
  }
  </script>
  <style scoped>
  
  .Such-container {
    margin: 1.25rem 0 1.25rem 1.25rem;
    width: 25%;
    overflow: hidden;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
    margin-bottom: 1.25rem;
    background-color: #f8f8f8;
  }
  
  .Such-eingabe {
    padding: 0.625rem; 
    font-size: 0.875rem; 
    width: 100%;
    border-radius: 0.5rem;
    box-sizing: border-box;
    border: 1px solid rgb(209, 209, 209);
    outline: none;
  }
  
  /* Media Query für Tablets */
  @media only screen and (max-width: 1024px) {
    .Such-container {
      width: 30%; 
    }
  }
  
  /* Media Query für Handys */
  @media only screen and (max-width: 768px) {
    .Such-container {
      width: 40%; 
    }
  }
  </style>
    