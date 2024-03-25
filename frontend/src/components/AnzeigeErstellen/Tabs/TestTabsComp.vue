<template>
    <div class="tabs">
      <div class="tabs__nav">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tabs__nav-button', { 'tabs__nav-button--is-active': activeTab.id === tab.id }]"
          @click="activateTab(tab.id)"
        >
          {{ tab.title }}
        </button>
      </div>
      <div class="tabs__content">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          :class="['tabs__content-panel', { 'tabs__content-panel--is-active': activeTab.id === tab.id }]"
        >
          <slot :name="tab.id"></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TestTabsComp',
    data() {
      return {
        activeTab: this.tabs[0],
      };
    },
    props: {
      tabs: {
        type: Array,
        required: true,
      },
    },
    mounted() {
      this.tabs.forEach((tab) => {
        if (tab.active) {
          this.activateTab(tab.id);
        }
      });
    },
    methods: {
      activateTab(tabId) {
        const newActiveTab = this.tabs.find((tab) => tab.id === tabId);
        if (newActiveTab && newActiveTab.id !== this.activeTab.id) {
          this.activeTab = newActiveTab;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .tabs {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .tabs__nav {
    display: flex;
    padding: 12px;
    border-bottom: 1px solid #ccc;
  }
  
  .tabs__nav-button {
    background: none;
    border: none;
    color: #000;
    padding: 0 12px;
    font-size: 16px;
    cursor: pointer;
  }
  
  .tabs__nav-button:focus {
    outline: none;
  }
  
  .tabs__nav-button:first-child:not(:last-child) {
    border-right: 1px solid #ccc;
  }
  
  .tabs__nav-button:last-child:not(:first-child) {
    border-left: 1px solid #ccc;
  }
  
  .tabs__nav-button:not(:first-child) {
    margin-left: 12px;
  }
  
  .tabs__nav-button:not(:last-child) {
    margin-right: 12px;
  }
  
  .tabs__nav-button:hover {
    color: #333;
  }
  
  .tabs__nav-button.tabs__nav-button--is-active {
    font-weight: bold;
  }
  
  .tabs__content {
    display: flex;
  }
  
  .tabs__content-panel {
    order: 1;
    width: 100%;
    height: 100%;
    margin: 12px;
    display: none;
  }
  
  .tabs__content-panel--is-active {
    display: block;
  }
  </style>