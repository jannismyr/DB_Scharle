<template>

    <h1>Hier werden die Beweise eingefügt</h1>

    {{ Aktenzeichen }}

    {{ Bild }}
<br><br><br><br>
    <select v-model="Typ">
        <option disabled selected value="null">Beweisart auswählen</option>
        <option value="Bild">Bild</option>
        <option value="Gegenstand">Gegenstand</option>
        <option value="Zeuge">Zeuge</option>
    </select>
    <div v-if="Typ === 'Bild'">
        <h1>Bild</h1>
        <br><br><br>
        <form @submit.prevent="false">
            <BildComp @Bild-Daten="getBild"/>

            <button type="submit" @click="beweisSpeichern('Bild')">Abspeichern</button>
        </form>
        
    </div>
    <div v-else-if="Typ === 'Gegenstand'">
        <h1>Gegenstand</h1>
<br><br><br>
        <form @submit.prevent="false">
            <GegenstandComp @Gegenstand-Daten="getGegenstand"/>

            <button type="submit" @click="beweisSpeichern('Gegenstand')">Abspeichern</button>
        </form>

        

    </div>
    <div v-else-if="Typ === 'Zeuge'">
        <h1>Zeuge</h1>
        <br><br><br>
        <form @submit.prevent="false">
            <ZeugeComp @Zeuge-Daten="getZeuge"/>

            <button type="submit" @click="beweisSpeichern('Zeuge')">Abspeichern</button>
        </form>

        
    </div>

</template>

<script>
import axios from 'axios'
import ZeugeComp from './Comps/ZeugeComp.vue'
import BildComp from './Comps/BildComp.vue'
import GegenstandComp from './Comps/GegenstandComp.vue'

export default {
    name:'DatenEingabe',
    components:{
        ZeugeComp,
        BildComp,
        GegenstandComp
    },
    data(){
        return {
            Aktenzeichen: this.$route.params.Aktenzeichen,
            Typ: null,
            Gegenstand: null,
            Bild: null,
            Zeuge: null
        }
    },
    methods:{
        getGegenstand(Gegenstand){
            this.Gegenstand= Gegenstand
        },
        getBild(Bild){
            this.Bild= Bild
        },
        getZeuge(Zeuge){
            this.Zeuge= Zeuge
        },
        beweisSpeichern(Art){
            alert(Art)
            switch (Art) {
                case "Bild":
                    axios.post(`/case/${this.Aktenzeichen}/Beweise?Art=${Art}`, {
                        Erfasser: JSON.parse(sessionStorage.getItem('Nutzer')).BName,
                        Bez: this.Bild.Bez,
                        kurzbeschreibung: this.Bild.kurzbeschreibung
                    })
                    break;
                case "Gegenstand":
                    axios.post(`/case/${this.Aktenzeichen}/Beweise?Art=${Art}`, {
                        Erfasser: JSON.parse(sessionStorage.getItem('Nutzer')).BName,
                        GArt: this.Gegenstand.GegenstandsArt,
                        SRN:this.Gegenstand.Seriennummer,
                        Marke:this.Gegenstand.Marke,
                        GRelevanz:this.Gegenstand.Relevanz,                  
                    })
                    break;
                case "Zeuge":
                    axios.post(`/case/${this.Aktenzeichen}/Beweise?Art=${Art}`, {
                        Erfasser: JSON.parse(sessionStorage.getItem('Nutzer')).BName,
                        VName: this.Zeuge.VName,
                        NName:this.Zeuge.NName,
                        Aussage:this.Zeuge.Aussage,
                        ZRelevanz:this.Zeuge.Relevanz,
                    })
                    break;
            
                default:
                    break;
            }
        }
    }
}
</script>

<style scoped>
form{
    width: 40%;
    margin-left: 30%;
}
div{
    align-items: center;
}
</style>