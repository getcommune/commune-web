<script lang="ts" setup>
import { onBeforeUnmount } from "vue";
import state from "../../framework/state";
import useBreakpoint from "../../utils/breakpoint/hook";
import Content from "./Content.vue";
import Sheet from "../Sheet/index.vue";
import Button from "../Button/index.vue";

const breakpoint = useBreakpoint();
</script>

<template>
  <Sheet
    v-if="breakpoint.isMobile"
    v-model="state.waitingListModal"
    z-index-offset="10"
    snap-mandatory
    close-on-click
    @vnode-before-unmount="state.waitingListModal = false"
  >
    <template #prepend="{ ratio, active }">
      <UiTransition :config="{ enter: 'fade', leave: `fade(0, ${ratio})` }">
        <div
          v-if="active"
          style="
            background-color: rgb(0, 0, 0, 0.6);
            inset: 0;
            position: fixed;
            pointer-events: none;
          "
          :style="{ opacity: ratio }"
        ></div>
      </UiTransition>
    </template>

    <template #default="{ transitionEvents, active, close, swipedOut }">
      <UiTransition
        v-on="transitionEvents"
        :config="['slideY(100)', 'fade']"
        spring="stiff"
        :duration="swipedOut && !active ? 1 : undefined"
      >
        <div
          v-if="active"
          class="h-full max-h-[85vh] w-full flex-centered outline-none"
          @click.stop
        >
          <div
            class="bg-background dark:bg-surface-d dark:border border-b-0 border-divider-d relative z-1 min-w-[100vw] rounded-t-lg max-h-[inherit] overflow-y-auto overflow-x-hidden"
          >
            <Content />

            <div class="pb-12 px-5 -mt-3">
              <Button
                class="!bg-primary-base/5 dark:bg-primary-base-d/5 !text-primary-base dark:!text-primary-base-d w-full"
                @click="close"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </UiTransition>
    </template>
  </Sheet>
</template>