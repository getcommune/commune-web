<script lang="ts">
import { computed } from "@vue/reactivity";
import {
  defineComponent,
  h,
  PropType,
  withDirectives,
} from "@vue/runtime-core";
import autofocus from "../../framework/directives/autofocus";
import Click from "../Click/index.vue";
import Spinner from "../Spinner/index.vue";

export default defineComponent({
  name: "Button",
  props: {
    tag: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      default: "button",
    },
    disabled: Boolean,
    readonly: Boolean,
    autofocus: Boolean,
    loading: Boolean,
  },
  setup(_props, { slots, attrs }) {
    const props = computed(() => _props);

    const isInert = computed(() => {
      return (
        props.value.loading || props.value.readonly || props.value.disabled
      );
    });

    return () => {
      return withDirectives(
        h(
          Click,
          {
            range: 20,
            addWillChangeClass: true,
            activeClass: "click-active",
          },
          {
            default: () => {
              return h(
                props.value.tag,
                {
                  type: "button",
                  inert: isInert.value,
                  tabindex: isInert.value
                    ? "-1"
                    : /^(?:a|button|input)$/.test(props.value.tag)
                    ? undefined
                    : "0",
                  ...attrs,
                  disabled: props.value.disabled || undefined,
                  class: "Button fill-before",
                },
                [
                  props.value.loading
                    ? [
                        h("span", { class: "invisible" }, [slots.default?.()]),
                        h("div", { class: "pseudo flex-centered" }, [
                          h(Spinner, { class: "animate-spin w-8 h-8" }),
                        ]),
                      ]
                    : slots.default?.(),
                ]
              );
            },
          }
        ),
        [[autofocus, props.value.autofocus]]
      );
    };
  },
});
</script>

<style scoped lang="postcss">
.Button {
  @apply inline-flex justify-center items-center bg-primary-base dark:bg-primary-base-d text-background h-14 px-6 rounded-[0.9rem] before:bg-current before:-z-1 relative isolate before:transition-opacity can-hover:hover:before:opacity-5 click-active:before:opacity-20 before:opacity-0 transition-[transform,box-shadow] click-active:scale-[0.99] focus-visible:ring-2 ring-offset-2 border-none outline-none ring-offset-background dark:ring-offset-background-d ring-primary-base dark:ring-primary-base-d font-medium text-base lg:text-lg select-none;
  touch-action: manipulation;
}
</style>
