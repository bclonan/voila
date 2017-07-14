<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir Next', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #8D9AAD;
}

a {
  color: #F62440;
  font-size: 13px;
}

a:hover, a:visited, a:link, a:active {
    text-decoration: none;
}
</style>
