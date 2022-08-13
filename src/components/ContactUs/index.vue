<script lang="ts" setup>

import { getFirestore, collection, addDoc } from "@firebase/firestore";
import { reactive } from "vue";

import UiForm from "../UiForm/index.vue";
import UiInput from "../UiInput/index.vue";
import Button from "../Button/index.vue";
import theme from "../../utils/theme";
import SunIcon from "../Icon/SunIcon.vue";
import MoonIcon from "../Icon/MoonIcon.vue";

import firebaseApp from "../../../firebaseInit";

const db = getFirestore(firebaseApp);

const addComment = async (email: string, comments: string) => {
  try {
    const docRef = await addDoc(collection(db, "questionbox"), {
      email: email,
      content: comments
    });
    alert("Submitted!");
  } catch(e) {
    return null
  }
}

const formModel = reactive({
  email: "",
  comments: ""
})
</script>

<template>
  <section id="contact-us" class="mt-24">
    <div class="text-center">
      <h2 class="font-semibold text-xl lg:text-2xl">Have questions?</h2>

      <p>Please contact us.</p>
    </div>

    <UiForm
      name="contactUs"
      action="."
      class="max-w-xs lg:max-w-lg mx-auto grid gap-y-5 lg:gap-y-8 mt-6 mb-20 lg:mt-12"
    >
      <UiInput
        type="email"
        v-model="formModel.email"
        label="Email"
        autocomplete="email"
        pattern="^.{2,99}$"
        placeholder="Jane@gmail.com"
        :validate="() => {}"
      />

      <UiInput
        type="textarea"
        v-model="formModel.comments"
        label="Comments"
        placeholder="Enter your comments"
        :validate="() => {}"
      />

      <Button type="submit" class="justify-self-center min-w-[18rem]" v-on:click="addComment(formModel.email, formModel.comments)">
        Submit
      </Button>
    </UiForm>
  </section>

  <footer class="flex items-center justify-between px-4 lg:px-16">
    <a href="">
      <h2
        class="text-primary-base dark:text-[#6489d0] font-black text-lg py-8 lg:text-xl"
      >
        Commune
      </h2>
    </a>

    <Button
      class="!bg-transparent !w-9 !h-9 !px-0 !text-xl"
      @click="theme.light = !theme.light"
    >
      <SunIcon
        v-if="theme.light"
        class="text-background-d/90 dark:text-background/80"
      />

      <MoonIcon v-else class="text-background-d/90 dark:text-background/80" />
    </Button>
  </footer>
</template>
