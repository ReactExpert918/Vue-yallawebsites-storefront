<script>
import appConfig from "@/app.config";

import { notificationMethods } from "@/state/helpers";

export default {
  name: "app",
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    }
  },
  mounted() {},
  watch: {
    /**
     * Clear the alert message on route change
     */
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.clearNotification();
    }
  },
  methods: {
    clearNotification: notificationMethods.clear
  }
};
</script>

<template>
  <div id="app">
    <div id="alert"></div>
    <notifications group="foo" />
    <RouterView />
  </div>
</template>
<style scoped>
  #alert {
    position: absolute;
    opacity: 0;
    right: -100%;
    background-color: rgb(12, 179, 76);
    float: right;
  }
  #alert.active {
    animation-name: example;
    animation-duration: 4s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 320px;
    height: 80px;
    padding: 10px;
    font-size: 15px;
    font-weight: bold;
    color: white;
    border-radius: 20px;
    background-color: rgb(32, 226, 106);
    z-index: 1005;
  }

  @keyframes example {
    0%   {opacity: 0; right: -100%; top:0px;}
    25%  {opacity: 1; right: 0; top:0px;}
    50%  {opacity: 1; right: 0; top:0px;}
    70%  {opacity: 1; right: 0; top:0px;}
    90%  {opacity: 1; right: 0; top:0px;}
    100% {visibility: hidden; right: -100%; top:0px;}
}
</style>
