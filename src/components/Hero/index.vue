<script lang="ts" setup>
import useBreakpoint from "../../utils/breakpoint/hook";
import EclipseIcon from "./EclipseIcon.vue";
import Button from "../Button/index.vue";
import state from "../../framework/state";
import Img from "../Img/index.vue";

const breakpoint = useBreakpoint();
</script>

<template>
  <section class="relative isolate">
    <div v-if="!breakpoint.isMobile" class="absolute -z-1 top-[-8rem]">
      <EclipseIcon />
    </div>

    <div
      class="lg:px-16 flex-col lg:flex-row flex lg:pt-40 text-center lg:text-left lg:space-x-4"
    >
      <div class="lg:max-w-[min(33rem,55%)] order-2 lg:order-1 px-4 lg:px-0">
        <h2 class="font-bold text-2xl lg:text-4xl">
          Find a new home with the best search experience
        </h2>

        <p class="text-base lg:text-lg mt-4 lg:mt-6 opacity-90">
          Save time and money when you rent or list a home on Commune. List your property for rent
          at no cost. Earn a commission off rent when you refer a homeowner to us.
        </p>

        <Button class="mt-8" @click="state.waitingListModal = true">
          Get Early Access
        </Button>
      </div>

      <div class="lg:-mt-14 order-1 lg:order-2 mb-10">
        <div class="flex justify-center lg:justify-end">
          <span
            class="lg:max-w-[min(30rem,45%)] lg:h-auto lg:w-auto h-[min(14rem,95vw)] w-[min(14rem,95vw)] inline-block"
          >
            <Img load-effect="fade" src="https://res.cloudinary.com/themachine/image/upload/v1660630053/commune-web/public/Globe_qi8why.png" alt="Globe" />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
