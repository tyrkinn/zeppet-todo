import { addClass, setText } from "@zeppet/actions";
import { compose, use } from "@zeppet/core";
import { addChild, removeWithDelay, useTimeout } from "./shared";

export const useToast = <T extends HTMLElement>(toastContainerSelect: T, delay: number) => (text: string) => {
  const alert = use<HTMLElement>(
    document.createElement('div'),
    addClass('alert', 'shadow-lg', 'alert-success'),
    setText(text)
  );
  addChild(alert)(toastContainerSelect)
  return toastAction(delay)(alert)
}

export const toastAction = (delay: number) => {
  return compose(
    addClass('transition', 'duration-300', 'linear'),
    useTimeout(
      delay,
      compose(addClass('opacity-0'), removeWithDelay(400))
    )
  )
}
