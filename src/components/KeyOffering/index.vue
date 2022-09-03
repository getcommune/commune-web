<script lang="ts" setup>
import useBreakpoint from "../../utils/breakpoint/hook";
import Img from "../Img/index.vue";

const breakpoint = useBreakpoint();
</script>

<template>
  <section class="relative isolate mt-16 xl:mt-28 lg:mt-40">
    <h2
      id="key-offerings"
      class="text-primary-base dark:text-[#6489d0] text-center font-bold text-xl lg:text-3xl"
    >
      Key Offerings
    </h2>
    <div
      class="flex-col lg:items-center lg:flex-row flex lg:text-left lg:space-x-16 pt-4 lg:pt-12 max-w-6xl lg:px-8 mx-auto"
    >
      <div
        class="order-2 lg:order-1 lg:w-[50%] grid gap-y-6 lg:gap-y-12 content-start px-4 lg:px-0"
        :class="{ 'max-w-lg mx-auto': breakpoint.isMobile }"
      >
        <div>
          <h3
            class="text-primary-base dark:text-[#6489d0] text-lg lg:text-2xl font-medium"
          >
            List Your Property
          </h3>

          <p class="mt-2 lg:mt-4 lg:text-lg">
            No hassle and zero cost when you list your property with us. We
            bridge the gap between homeowners and potential tenants.
          </p>
        </div>

        <div>
          <h3
            class="text-primary-base dark:text-[#6489d0] text-lg lg:text-2xl font-medium"
          >
            Find An Apartment
          </h3>

          <p class="mt-2 lg:mt-4 lg:text-lg">
            Save time and money spent in househunting - get access to
            information on available homes - connect with a pool of individuals
            like you seeking an easier rental experience.
          </p>
        </div>

        <div>
          <h3
            class="text-primary-base dark:text-[#6489d0] text-lg lg:text-2xl font-medium"
          >
            Find A Flatmate
          </h3>

          <p class="mt-2 lg:mt-4 lg:text-lg">
            Our preference-based matching system will suggest users with similar
            interests and lifestyle choices as you.
          </p>
        </div>
      </div>

      <div class="lg:w-[50%] order-1 lg:order-2 px-4 lg:px-0 mb-8 lg:mb-0">
        <span class="mx-auto lg:mx-[initial] max-w-xs">
          <Img
            src="https://res.cloudinary.com/themachine/image/upload/v1660630057/commune-web/public/KeyOfferings_y9gh8q.png"
            alt="Image"
          />
        </span>
      </div>
    </div>
  </section>
</template>
