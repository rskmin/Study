<template>
  <div>
    <h1>默认主题</h1>
    <div>按钮</div>
    <pl-button label="text" />
    <pl-button>slot</pl-button>
    <div>按钮状态</div>
    <pl-button
      v-for="item in ['primary', 'success', 'warn', 'error', 'info']"
      :label="item"
      :key="item"
      :status="item"
    />
    <h4>card</h4>
    <pl-my-card
      v-for="item in ['primary', 'success', 'warn', 'error', 'info']"
      :key="item"
      :status="item"
    />
  </div>
  <div class="theme-blue">
    <h1>blue主题</h1>
    <div>按钮</div>
    <pl-button label="text" />
    <pl-button>slot</pl-button>
    <div>按钮状态</div>
    <pl-button
      v-for="item in ['primary', 'success', 'warn', 'error', 'info']"
      :label="item"
      :key="item"
      :status="item"
    />
    <h4>card</h4>
    <pl-my-card
      v-for="item in ['primary', 'success', 'warn', 'error', 'info']"
      :key="item"
      :status="item"
    />
  </div>
  <div class="theme-violet">
    <h1>violet主题</h1>
    <div>按钮</div>
    <pl-button label="text" />
    <pl-button>slot</pl-button>
    <div>按钮状态</div>
    <pl-button
      v-for="item in ['primary', 'success', 'warn', 'error', 'info']"
      :label="item"
      :key="item"
      :status="item"
    />
    <h4>card</h4>
    <pl-my-card
      v-for="item in ['primary', 'success', 'warn', 'error', 'info']"
      :label="item"
      :key="item"
      :status="item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
