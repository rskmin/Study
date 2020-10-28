<template>
  <app-navigator defaultPath="normal/button" ref="navigator">
    <div class="app-home">
      <section class="app-header">
        <span @click="goHome">vue3-component-rskmin&nbsp;(V3CompRm)</span>
      </section>
      <section class="app-menu">
        <app-menu />
      </section>
      <section class="app-content">
        <app-navigator-page />
      </section>
    </div>
  </app-navigator>
</template>

<script lang="ts">
import { AppNavigator } from "./components/navigator/app-navigator";
import { AppNavigatorPage } from "./components/navigator/app-navigator-page";
import AppMenu from "./components/app/app-menu.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "app",
  components: {
    AppMenu,
    AppNavigator,
    AppNavigatorPage,
  },
  methods: {
    goHome() {
      (this.$refs.navigator as any).$._refer.methods.go("home");
    },
  },
});
</script>

<style lang="scss">
$headSize: 60px;
$meunSize: 300px;

.app-home {
  .app-header {
    height: $headSize;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    box-sizing: border-box;
    border-bottom: solid 1px #f2f2f2;
    background-color: white;
    font-size: 20px;
    font-weight: bold;
    font-style: italic;
    color: #42b983;
  }

  .app-menu {
    position: fixed;
    width: $meunSize;
    top: $headSize;
    left: 0;
    bottom: 0;
    border-right: solid 1px #f2f2f2;
    background-color: white;
  }

  .app-content {
    min-height: 100vh;
    box-sizing: border-box;
    padding-top: $headSize;
    padding-left: $meunSize;
  }
}
</style>