<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from "vue";
import theme, { installTheme } from "./utils/theme";
import Header from "./components/Header/index.vue";
import Hero from "./components/Hero/index.vue";
import AboutUs from "./components/AboutUs/index.vue";
import KeyOffering from "./components/KeyOffering/index.vue";
import HowItWorks from "./components/HowItWorks/index.vue";
import ContactUs from "./components/ContactUs/index.vue";
import Desktop from "./components/WaitingListModal/Desktop.vue";
import Mobile from "./components/WaitingListModal/Mobile.vue";

import scrollPolyfill from "scroll-polyfill";
import { sleep } from "./utils/sleep";
import state from "./framework/state";

export default defineComponent({
  name: "app",
  directives: {},
  setup() {
    onBeforeMount(() => {
      installTheme();
      scrollPolyfill();

      sleep().then(() => {
        const { hash } = location;

        const section = document.getElementById(hash);

        if (section) {
          document.documentElement.scrollTo({
            top: section.offsetTop,
          });
        }
      });
    });

    onMounted(() => {
      sleep().then(() => {
        state.value.mounted = true;
      });
    });
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
