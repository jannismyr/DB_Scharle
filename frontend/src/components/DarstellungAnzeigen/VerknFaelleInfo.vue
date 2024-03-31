<template>
    <div class="container">
       <div class="box">
             <h3>Aktenzeichen: {{ Aktenzeichen }}</h3>
             <h3>Begründung: {{ Begruendung }}</h3>
         </div>
     </div>
</template>

<script>
  export default {
    name: "AnzeigeKomp",
    props:{
      Aktenzeichen: String,
      Begruendung:String
    },
    data() {
        return{
          Faelle: [],
        }
    },
    methods: {
    
    }
  };
</script>

<style scoped>
.Router{
  color: rgb(53, 53, 53);
}

.container {
  display: flex;
  justify-content: center;
}
.box {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  max-width: 31.25rem;
  transition: box-shadow 0.3s ease-in-out; 
}
.box:hover{
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3); 
  cursor: pointer;
}

</style>