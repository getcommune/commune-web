import { ref } from "vue";

const state = ref({
  resizeKey: 0,
  overlays: {} as Record<string, number>,
  waitingListModal: false,
  privacyPolicyModal: false,
  mounted: false,
});

export default state;
