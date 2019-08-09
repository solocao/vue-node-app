<template>
  <div id="app">
    <h1>Shared Event List</h1>
    <eventList></eventList>
  </div>
</template>

<script>
import eventList from "./components/event_list";

export default {
  name: "app",
  components: {
    eventList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

h1 {
  margin-bottom: 1.5rem !important;
}
</style>
