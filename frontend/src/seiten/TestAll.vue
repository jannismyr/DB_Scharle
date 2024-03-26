<template>
    <h1>Testseite</h1>
<Suchleiste @Suche-Fall="Fallsuche"/>

{{ AlleVeranstaltungen }}
    <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
    />
</template>

<script>
import axios from 'axios'
import Suchleiste from '../components/Sonstiges/Suchleiste.vue'
import {Bar} from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default{
    components:{
        Bar,
        Suchleiste
    },
    data(){
        return{
            chartData: {
            labels: [ 'January', 'February', 'March' ],
            datasets: [ { data: [40, 20, 12] } ]
            },
            chartOptions: {
            responsive: true
            },
            Data2: {
                labels: [],
                datasets:[{data:[]}]
            },
            AlleVeranstaltungen: null
        }
    },
    methods: {
    async Fallsuche(){
      await axios.get(`/case/Analyse?Vorwurf=Mord&Ort=Baden-Württemberg`)
      .then(result => {
        this.AlleVeranstaltungen = result.data
      })
    }
      // Hier kommen die Methoden der Seite
    },
    async created(){
        
    }
}
</script>