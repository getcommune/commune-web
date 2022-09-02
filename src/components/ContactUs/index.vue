<script lang="ts" setup>
import { getFirestore, collection, addDoc } from "@firebase/firestore";
import { reactive, ref } from "vue";
import emailjs from "@emailjs/browser";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

import UiForm from "../UiForm/index.vue";
import UiInput from "../UiInput/index.vue";
import Button from "../Button/index.vue";
import theme from "../../utils/theme";
import SunIcon from "../Icon/SunIcon.vue";
import MoonIcon from "../Icon/MoonIcon.vue";

import firebaseApp from "../../../firebaseInit";
import Img from "../Img/index.vue";
import state from "../../framework/state";

import TwitterIcon from "../Icon/TwitterIcon.vue";
import LinkedinIcon from "../Icon/LinkedinIcon.vue";

const emits = defineEmits(["form-submitted", "submit-error"]);
const $toast = useToast();
const db = getFirestore(firebaseApp);
const loading = ref(false);
const PUBKEY = import.meta.env.VITE_EMAILJS1_PUBKEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACTUS_TEMPLATE_ID;

const addComment = async () => {
  try {
    loading.value = true;

    const { email, message } = formModel;

    await addDoc(collection(db, "questionbox"), {
      email: email,
      content: message,
    });
    emits("form-submitted");

    $toast.success("Your message has been sent!", {
      position: "top",
      duration: 5000,
    });
    try {
      emailjs.send(SERVICE_ID, TEMPLATE_ID, formModel, PUBKEY).then(
        () => {
          emits("form-submitted");
        },
        () => {
          emits("submit-error");
        }
      );
    } catch (e) {
      console.log("ERROR: ", e);
    }
  } catch (e) {
    emits("submit-error");
  } finally {
    loading.value = false;
    Object.assign(formModel, initialState);
  }
};

const initialState = {
  email: "",
  message: "",
};

const formModel = reactive({ ...initialState });

const storeLinks = [
  {
    title: "App store",
    src: "https://res.cloudinary.com/themachine/image/upload/v1661027211/commune-web/public/appstore2_kj1mmc",
  },
  {
    title: "Play store",
    src: "https://res.cloudinary.com/themachine/image/upload/v1661027214/commune-web/public/playstore2_vfuxu1",
  },
];

const socialLinks = [
  {
    title: "Twitter",
    icon: TwitterIcon,
    href: "#",
  },
  {
    title: "LinkedIn",
    icon: LinkedinIcon,
    href: "#",
  },
];
</script>

<template>
  <section id="contact-us" class="mt-24">
    <div class="text-center">
      <h2
        class="text-primary-base dark:text-[#6489d0] font-semibold text-xl lg:text-2xl"
      >
        Have Questions?
      </h2>

      <p>Please contact us</p>
    </div>

    <UiForm
      v-slot="{ submit }"
      id="contact-us"
      @submit-form="addComment"
      name="contactUs"
      action="."
      class="max-w-xs lg:max-w-lg mx-auto grid gap-y-5 lg:gap-y-8 mt-6 mb-20 lg:mt-12 px-4"
    >
      <UiInput
        type="email"
        v-model="formModel.email"
        label="Email"
        autocomplete="email"
        pattern="^.{2,99}$"
        placeholder="Jane@gmail.com"
        :validate="() => {}"
        required
      />

      <UiInput
        type="textarea"
        v-model="formModel.message"
        label="Message"
        placeholder="Enter your message"
        :validate="() => {}"
        required
      />

      <Button
        type="submit"
        class="justify-self-center min-w-[18rem]"
        :loading="loading"
        @click="submit"
      >
        Send
      </Button>
    </UiForm>
  </section>

  <section class="grid justify-center mb-8">
    <p class="text-heading mb-6 text-lg text-center font-semibold">
      Available soon on
    </p>

    <div class="grid md:grid-cols-2 w-full md:max-w-lg gap-5 md:gap-8">
      <Button
        color="#fff"
        v-for="(link, i) in storeLinks"
        :key="link.title"
        class="!p-0 max-w-[75vw] max-h-[4rem]"
        href=""
      >
        <Img
          :alt="`${i ? 'Playstore' : 'Appstore'} icon`"
          :src="`${link.src}.png`"
          load-class="h-full pointer-events-none"
          :loading="state.mounted ? 'eager' : 'lazy'"
        />
      </Button>
    </div>
  </section>

  <footer
    class="mt-6 md:mt-8 fill-before relative before:bg-current isolate before:-z-1 before:opacity-[0.025]"
  >
    <hr class="border-t border-divider dark:border-divider-d mb-6 md:mb-8" />

    <section class="grid justify-center mb-8">
      <p class="text-heading mb-6 text-lg text-center font-semibold">
        Contact us
      </p>

      <div class="grid grid-cols-2 gap-3 md:gap-5">
        <Button
          v-for="item in socialLinks"
          :key="item.title"
          :href="item.href"
          :title="item.title"
          icon
          class="!bg-transparent !w-12 !h-12 !px-0 !text-xl text-inherit"
        >
          <Component :is="item.icon" />
        </Button>
      </div>
    </section>

    <section class="flex items-center justify-between px-4 lg:px-16">
      <a href="">
        <h2
          class="text-primary-base dark:text-[#6489d0] font-black text-lg py-8 lg:text-xl"
        >
          Commune
        </h2>
      </a>

      <Button
        class="!bg-transparent !w-9 !h-9 !px-0 !text-xl text-inherit"
        @click="theme.light = !theme.light"
      >
        <SunIcon
          v-if="theme.light"
          class="text-background-d/90 dark:text-background/80"
        />

        <MoonIcon v-else class="text-background-d/90 dark:text-background/80" />
      </Button>
    </section>
  </footer>
</template>