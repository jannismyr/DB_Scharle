<template>

    <div class="button-container">
      <Tabs :tabs="tabs">
        <template #Opfer>
          <div>
            <h1>Hier gibt es die Daten zum Opfer</h1>
          </div>
        </template>
  
        <template #Täter>
          <div>
            <h1>Hier gibt es die Daten zum Täter</h1>
          </div>
        </template>

        <template #Geo>
          <div>
            <h1>Hier gibt es die Geografischen Daten zur Tat</h1>
          </div>
        </template>
      </Tabs>
    </div>
</template>
  
<script>import Tabs from '../components/TestTabsComp.vue';

export default {
  name: 'App',
  components: {
    Tabs,
  },
  data() {
    return {
      tabs: [
        {
          id: 'Opfer',
          title: 'Opfer',
          active: true,
        },
        {
          id: 'Täter',
          title: 'Täter',
          active: false,
        },
        {
          id: 'Geo',
          title: 'Geografische Daten',
          active: false,
        },
      ],
    };
  },
};
</script>

<style>
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  height: 100vh;
}
</style>