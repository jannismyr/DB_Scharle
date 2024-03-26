<template>
    <div>
    <div v-if="Fall">
        <DetailKomp :key="Fall._id"
            :Aktenzeichen="Fall._id"
            :Tat="Fall.Tatvorwurf"
            :Datum="Fall.Tatzeit"
            :VNameOpfer="Fall.Opfer.Vorname"
            :NNameOpfer="Fall.Opfer.Nachname"
            :VNameTaeter="Fall.Taeter.Vorname"
            :NNameTaeter="Fall.Taeter.Nachname"
            :Bundesland="Fall.Ort.Bundesland"
            :VerknFaelle="Fall.VerknuepfteFaelle"
        />
    </div>
    
    </div>
</template>

<script>
import axios from 'axios';
import DetailKomp from '../components/DetailComp.vue'


export default {
    name: 'DetailAnsicht',
    components:{
        DetailKomp
    },
    data() {
        return {
            Aktenzeichen: this.$route.params.Aktenzeichen,
            Fall:{}
        };
    },
    async created(){
        await axios.get(`/case/${this.Aktenzeichen}`)
        .then( res =>{
            this.Fall = res.data
        }
        )
    }
   
};
</script>
