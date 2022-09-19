<script lang="ts" setup>
import Tab from "../Tab/index.vue";
import Renter from "./Tabs/Renter.vue";
import HomeOwner from "./Tabs/HomeOwner.vue";

const tabOption = [
  { title: "Home owner", component: HomeOwner },
  { title: "Renter", component: Renter },
];
</script>

<template>
  <div>
    <div
      class="lg:max-w-[min(33rem,55%)] order-2 lg:order-1 pr-4 lg:px-0 pl-4 pt-4 lg:pl-8"
    >
      <h2
        class="text-primary-base dark:text-[#6489d0] font-bold text-lg lg:text-2xl mt-2 lg:mt-4"
      >
        Count Me In!
      </h2>
      <h3 class="font-light lg:mt-1">
        Get early access, news & updates.
      </h3>
    </div>

    <Tab :option="tabOption" loop>
      <template #default="{ items, select }">
        <div class="flex justify-center mt-4 lg:mt-8">
          <div class="flex items-center content-center">
            <div
              v-for="{ item, attrs, active } in items"
              :key="item.title"
              v-bind="attrs"
              class="bg-black/5 dark:bg-white/5 transition-all cursor-pointer py-2 border-divider dark:border-divider/5"
              :class="{
                'font-bold': active,
                'opacity-80 text-sm': !active,
                'rounded-l-full pl-6 pr-3': item.title === 'Home owner',
                'border-r': item.title === 'Home owner' && active,
                'border-l': item.title === 'Renter' && active,
                'rounded-r-full pr-6 pl-3': item.title === 'Renter',
              }"
              @click="select(item)"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </template>

      <template #content="{ items }">
        <UiTransition
          :config="['slideX(-5)', 'fade']"
          :spring="{ enter: 'wobbly' }"
        >
          <template v-for="{ item, active, attrs } in items" :key="item.title">
            <div v-if="active" v-bind="attrs">
              <Component :is="item.component" />
            </div>
          </template>
        </UiTransition>
      </template>
    </Tab>
  </div>
</template>

<style></style>
