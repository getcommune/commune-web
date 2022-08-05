<script>
import { getCurrentInstance, h, resolveComponent } from "@vue/runtime-core";
import { nextAnimFrame } from "/src/utils/index.ts";

const form = (d, c) => h("form", d, c);

export default {
  name: "UiForm",
  emits: ["submit-clicked", "submit-form"],
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(_, { emit }) {
    const i = getCurrentInstance();

    const submit = async () => {
      emit("submit-clicked");

      await nextAnimFrame();
      const isValid = i.subTree.el.reportValidity();

      if (isValid) {
        emit("submit-form");
      }
    };

    return function () {
      return form(
        {
          name: this.name,
          class: ["ui-form", `dark-theme`],
          onSubmit: (e) => {
            e.preventDefault();
          },
        },
        [
          this.$slots.default?.({ submit }) || null,

          this.$slots.append?.({ submit }) || null,
        ]
      );
    };
  },
};
</script>

<style>
.ui-form.dark-theme:not(.root[data-pfm]) {
  --info: #026fb3;
  --info-gradient: #508fb6;
}
.ui-form.light-theme:not(.root[data-pfm]) {
  --info: var(--primary);
  --info-gradient: rgb(54, 93, 114);
}
</style>
