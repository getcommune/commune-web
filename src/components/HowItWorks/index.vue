<script lang="ts" setup>
import Img from "../Img/index.vue";
const sections = [
  {
    title: "Search For An Apartment",
    content:
      "Run a quick search for apartments based on you unique preferences.",
  },
  {
    title: "Inspect Homes Virtually",
    content:
      "Using our VR/AR solutions, you can inspect your home immersively from multiple angles without making expensive physical visits. ",
  },
  {
    title: "Pay",
    content:
      "Once you are satisfied with your inspection, proceed to make your in-app payment for the apartment.",
  },
];
</script>

<template>
  <section class="relative isolate mt-16 xl:mt-28 lg:mt-40">
    <h2 id="how-it-works" class="text-center font-bold text-xl lg:text-3xl">
      How It Works
    </h2>
    <div
      class="flex-col lg:flex-row flex lg:text-left lg:space-x-4 pt-4 lg:pt-8"
    >
      <div class="lg:w-[50%]">
        <div class="flex justify-start">
          <span class="w-[min(32rem,50vw)] inline-block">
            <Img load-effect="fade" src="HowItWorks.png" alt="Image" />
          </span>
        </div>
      </div>

      <div
        class="mt-8 lg:mt-28 lg:w-[min(40rem,50%)] lg:max-w-lg px-4 lg:px-0 grid gap-y-8 lg:gap-y-16 content-start"
      >
        <div v-for="section in sections" :key="section.title">
          <h3 class="font-semibold lg:text-xl mb-1 lg:mb-2">
            {{ section.title }}
          </h3>
          <p>
            {{ section.content }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
