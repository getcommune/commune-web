<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";
import theme, { installTheme } from "./utils/theme";
import Header from "./components/Header/index.vue";
import Hero from "./components/Hero/index.vue";
import AboutUs from "./components/AboutUs/index.vue";
import KeyOffering from "./components/KeyOffering/index.vue";
import HowItWorks from "./components/HowItWorks/index.vue";
import ContactUs from "./components/ContactUs/index.vue";
import DeleteAccount from "./components/DeleteAccount/index.vue";
import Desktop from "./components/WaitingListModal/Desktop.vue";
import Mobile from "./components/WaitingListModal/Mobile.vue";
import Docs from "./components/Docs/index.vue";
import scrollPolyfill from "scroll-polyfill";
import { sleep } from "./utils/sleep";
import state from "./framework/state";

export default defineComponent({
  name: "app",
  directives: {},
  setup() {
    const docsPage = ref(false);
    const deleteAccountPage = ref(false);

    onBeforeMount(() => {
      docsPage.value =
        /^https?:\/\/(?:localhost|(?:\d+\.\d+\.\d+.\d+)):\d+\/docs\/?$/.test(
          location.href
        );
        deleteAccountPage.value =
        ///^https?:\/\/(?:localhost|\w+\.getcommune\.co|getcommune\.netlify\.app)(?::\d+)?\/.*delete-account\/?$/
        /^(https?:\/\/)?(?:\w+\.)?(getcommune\.co|--getcommune\.(?:netlify\.app|netlify\.app\/\w+))(?::\d+)?\/.*#delete-account\/?$/
.test(
  location.href


  );



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
    return { theme, docsPage, deleteAccountPage };
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
    Docs,
    DeleteAccount,
  },
});
</script>

<template>
  <Docs v-if="docsPage" />
  <DeleteAccount v-if="deleteAccountPage"/>

  <div
    v-else
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
