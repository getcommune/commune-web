<script lang="ts" setup>
import state from "../../framework/state";
import useBreakpoint from "../../utils/breakpoint/hook";
import Overlay from "../Overlay/index.vue";
import Content from "./Content.vue";

const breakpoint = useBreakpoint();
</script>

<template>
  <Overlay
    v-if="!breakpoint.isMobile"
    v-model="state.waitingListModal"
    closeOnClickOutside
    z-index-offset="10"
    always-render
    custom-transition
    @vnode-before-unmount="state.waitingListModal = false"
  >
    <template #default="{ close, transitionEvents, active }">
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%">
        <UiTransition appear>
          <div
            v-if="active"
            @click="close"
            style="
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: rgb(0, 0, 0, 0.5);
            "
          ></div>
        </UiTransition>

        <UiTransition
          appear
          v-on="transitionEvents"
          :spring="{
            enter: {
              mass: 1.5,
            },
          }"
          :config="{
            enter: 'slideY(20)',
            leave: ['slideY(20)', 'fade'],
          }"
        >
          <div v-if="active" class="h-full w-full flex-centered outline-none">
            <div
              class="bg-background dark:bg-surface-d shadow-xl dark:shadow-none dark:border border-divider-d relative z-1 min-w-[40rem] rounded-lg max-h-[calc(100vh-2rem)] overflow-y-auto overscroll-contain"
            >
              <Content />
            </div>
          </div>
        </UiTransition>
      </div>
    </template>
  </Overlay>
</template>
