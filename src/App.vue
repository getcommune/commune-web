<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import theme, { installTheme } from "./utils/theme";
import Header from "./components/Header/index.vue";
import Hero from "./components/Hero/index.vue";
import AboutUs from "./components/AboutUs/index.vue";
import KeyOffering from "./components/KeyOffering/index.vue";
import HowItWorks from "./components/HowItWorks/index.vue";
import ContactUs from "./components/ContactUs/index.vue";
import Desktop from "./components/WaitingListModal/Desktop.vue";
import Mobile from "./components/WaitingListModal/Mobile.vue";

export default defineComponent({
  name: "app",
  directives: {},
  setup() {
    onBeforeMount(installTheme);
    return { theme };
  },
  components: {
    Header,
    Hero,
    AboutUs,
    KeyOffering,
    HowItWorks,
    ContactUs,
    Desktop,
    Mobile,
  },
});
</script>

<template>
  <div
    id="app"
    class="h-full w-full bg-background dark:bg-background-d"
    @touchstart.passive
  >
    <Header />

    <Hero />

    <AboutUs />

    <KeyOffering />

    <HowItWorks />

    <ContactUs />

    <Desktop />

    <Mobile />
  </div>
</template>

<style></style>
