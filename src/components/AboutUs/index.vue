<script lang="ts" setup>
import useBreakpoint from "../../utils/breakpoint/hook";
import Img from "../Img/index.vue";

const breakpoint = useBreakpoint();
</script>

<template>
  <section class="relative isolate mt-16 xl:mt-28 lg:mt-40">
    <h2
      id="about-us"
      class="text-primary-base dark:text-[#6489d0] text-center font-bold text-xl lg:text-3xl"
    >
      About Us
    </h2>
    <div
      class="flex-col lg:flex-row flex lg:text-left lg:space-x-4 pt-4 lg:pt-8"
      :class="{ 'max-w-lg mx-auto': breakpoint.isMobile }"
    >
      <div class="lg:w-[50%]">
        <div class="flex justify-start">
          <span class="w-[min(32rem,50vw)] inline-block">
            <Img
              load-effect="fade"
              src="https://res.cloudinary.com/themachine/image/upload/v1660630058/commune-web/public/AboutUs_uyaj1k.png"
              alt="Image"
            />
          </span>
        </div>
      </div>

      <div class="mt-8 lg:mt-20 lg:w-[min(40rem,50%)] lg:max-w-lg px-4 lg:px-0">
        <h3 class="font-semibold text-xl lg:text-2xl mb-7 lg:mb-9">
          Housing solutions for modern Africa
        </h3>

        <div class="grid gap-y-4 lg:gap-y-6">
          <!--<p>
            Commune is a technology company solving the challenges faced by
            renters in the African housing industry.
          </p>-->

          <p>
            We connect people looking to rent with homeowners in less time and
            at little cost.
          </p>

          <p>
            With Commune, you can virtually inspect your apartment from anywhere
            with an improved visual experience.
          </p>

          <p>Spend less time closing deals when you list your homes with us.</p>
        </div>
      </div>
    </div>
  </section>
</template>