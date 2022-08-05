import { ref } from "vue";

const state = ref({
  resizeKey: 0,
  overlays: {} as Record<string, number>,
  waitingListModal: false,
});

export default state;
