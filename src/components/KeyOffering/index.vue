<script lang="ts" setup>
import Img from "../Img/index.vue";
</script>

<template>
  <section class="relative isolate mt-16 xl:mt-28 lg:mt-40">
    <h2 id="key-offerings" class="text-center font-bold text-xl lg:text-3xl">
      Key offerings
    </h2>
    <div
      class="flex-col lg:items-center lg:flex-row flex lg:text-left lg:space-x-16 pt-4 lg:pt-12 max-w-6xl lg:px-8 mx-auto"
    >
      <div
        class="order-2 lg:order-1 lg:w-[50%] grid gap-y-6 lg:gap-y-12 content-start px-4 lg:px-0"
      >
        <div>
          <h3 class="text-lg lg:text-2xl font-medium">Find an Apartment</h3>

          <p class="mt-2 lg:mt-4 lg:text-lg">
            Save time and money spent in checking houses you will not live in;
            get access to information on available homes; connect with a pool of
            renters like you seeking an easier rental experience.
          </p>
        </div>

        <div>
          <h3 class="text-lg lg:text-2xl font-medium">Find a Flatmate</h3>

          <p class="mt-2 lg:mt-4 lg:text-lg">
            Our preference-based matching system will suggest individuals with
            similar interests and lifestyle choices as you if you are looking
            for a co-living partner.
          </p>
        </div>
      </div>

      <div class="lg:w-[50%] order-1 lg:order-2 px-4 lg:px-0 mb-8 lg:mb-0">
        <span class="mx-auto lg:mx-[initial] max-w-xs">
          <Img src="KeyOfferings.png" alt="Image" />
        </span>
      </div>
    </div>
  </section>
</template>
