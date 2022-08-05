<script lang="ts" setup>
import { ref } from "vue";
import Button from "../Button/index.vue";
import useBreakpoint from "../../utils/breakpoint/hook";
import theme from "../../utils/theme";
import Position from "../Position/index.vue";
import Intersection from "../Intersection/index.vue";
import MenuOpenIcon from "../Icon/MenuOpenIcon.vue";
import CloseIcon from "../Icon/CloseIcon.vue";
import SunIcon from "../Icon/SunIcon.vue";
import MoonIcon from "../Icon/MoonIcon.vue";
import state from "../../framework/state";

const breakpoint = useBreakpoint();

const intersecting = ref(false);

const dropdownActive = ref(false);

const links = [
  {
    title: "About us",
  },
  {
    title: "Services",
  },
  {
    title: "Contact us",
  },
];
</script>

<template>
  <Intersection
    @update:entry="
      (evt) => {
        intersecting = evt.isIntersecting;
      }
    "
  >
    <div class="h-[1px] mt-[1px] lg:mt-8"></div>
  </Intersection>
  <header
    class="sticky top-0 py-3 z-1 before:w-full before:absolute before:bottom-0 before:left-0 before:bg-divider dark:before:bg-divider-d before:transition-opacity before:opacity-0"
    :class="{
      'supports-backdrop-filter:bg-background/80 dark:supports-backdrop-filter:bg-background-d dark:supports-backdrop-filter:bg-opacity-[0.875] supports-backdrop-filter:backdrop-blur-xl supports-backdrop-filter:backdrop-saturate-[200%] not-supports-backdrop-filter:bg-background/90 dark:not-supports-backdrop-filter:bg-background-d/90 before:h-[1px] before:!opacity-100':
        !intersecting && !dropdownActive,
      'bg-background dark:bg-background-d': dropdownActive,
    }"
  >
    <div class="px-4 lg:px-16 flex items-center justify-between">
      <a href="/">
        <h1
          class="text-primary-base dark:text-[#6489d0] font-black text-2xl lg:text-3xl"
        >
          Commune
        </h1>
      </a>

      <template v-if="!breakpoint.isMobile">
        <nav>
          <ul class="flex items-center space-x-11">
            <li v-for="link in links" :key="link.title">
              <a href="#">
                {{ link.title }}
              </a>
            </li>
          </ul>
        </nav>

        <Button @click="state.waitingListModal = true">
          Join the waitlist
        </Button>
      </template>

      <div v-else class="flex items-center justify-end space-x-2">
        <UiTransition :config="['fade', 'scale']">
          <Button
            v-if="dropdownActive"
            class="!bg-transparent !w-9 !h-9 !px-0 !text-xl"
            @click="theme.light = !theme.light"
          >
            <SunIcon
              v-if="theme.light"
              class="text-background-d/90 dark:text-background/80"
            />

            <MoonIcon
              v-else
              class="text-background-d/90 dark:text-background/80"
            />
          </Button>
        </UiTransition>

        <Position
          v-model="dropdownActive"
          :offset="[0, 0]"
          class="w-screen"
          fixed
        >
          <template #trigger="{ toggle, active, ref }">
            <span :ref="ref">
              <Button
                id="trigger"
                class="!bg-transparent !w-9 !h-9 !px-0 !text-xl"
                @click.prevent="toggle"
                @blur="toggle(false)"
              >
                <CloseIcon
                  v-if="active"
                  class="text-background-d dark:text-background"
                />
                <MenuOpenIcon
                  v-else
                  class="text-background-d dark:text-background"
                />
              </Button>
            </span>
          </template>

          <template #default="{ active, delayedActive }">
            <div
              class="overflow-hidden transition-[filter]"
              :class="{ 'drop-shadow-md': delayedActive }"
            >
              <UiTransition
                config="slideY(-100,0)"
                :spring="{ leave: 'gentle' }"
              >
                <div
                  v-if="delayedActive"
                  class="w-full px-6 pt-6 pb-8 border-b border-divider dark:border-divider-d bg-background dark:bg-background-d transition-opacity"
                  :class="{ 'opacity-0': !active }"
                >
                  <nav>
                    <ul class="grid gap-y-9">
                      <li v-for="link in links" :key="link.title">
                        <a href="#">
                          {{ link.title }}
                        </a>
                      </li>
                    </ul>
                  </nav>

                  <Button
                    class="w-full mt-9"
                    @click="
                      () => {
                        dropdownActive = false;

                        state.waitingListModal = true;
                      }
                    "
                  >
                    Join the waitlist
                  </Button>
                </div>
              </UiTransition>
            </div>
          </template>
        </Position>
      </div>
    </div>
  </header>
</template>
