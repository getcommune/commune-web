import { ref } from "vue";
import Breakpoint, { BreakpointOutput } from ".";

export interface BreakpointHook extends BreakpointOutput {
  isMobile?: boolean;
}

const state = ref<BreakpointHook>({});

let installed = false;

const screenSizes = {
  xxs: "0px",
  xs: "325px",
  sl: "400px",
  sm: "600px",
  md: "1080px",
  lg: "1264px",
  xl: "1327px",
  xxl: "1800px",
};

export default function useBreakpoint() {
  if (!installed) {
    const updateBreakpoint = (br: BreakpointOutput) =>
      (state.value = {
        ...state.value,
        ...br,
        isMobile: /xxs|xs|sl|sm/.test(br.is || ""),
      });

    const breakpoint: BreakpointOutput = new Breakpoint({
      config: screenSizes,
      useOrientation: true,
      onChange: (evt: BreakpointOutput) => {
        updateBreakpoint(evt);
      },
    });

    updateBreakpoint({
      is: breakpoint.is,
      orientation: breakpoint.orientation,
    });

    installed = true;
  }

  return state;
}
