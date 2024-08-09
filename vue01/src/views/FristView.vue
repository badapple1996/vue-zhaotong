<template>
    <div class="FristView">
      <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
      <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
      <!-- <test /> -->
      <HomePage />
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import HomePage from '@/components/HomePage.vue'
//   import test from '@/components/test.vue'
  
  export default {
    name: 'FristView',
    components: {
        HomePage,
        // test

    }
  }
  </script>
  