import { addClass, setText } from "@zeppet/actions";
import { compose, Select, selectNode } from "@zeppet/core";
import { addChild, removeWithDelay, useTimeout } from "./shared";

export const useToast = <T extends HTMLElement>(toastContainerSelect: Select<T>, delay: number) => (text: string) => {
  const alert = selectNode<T>(document.createElement('div') as unknown as T).use(
    addClass('alert', 'shadow-lg', 'alert-success'),
    setText(text)
  );
  toastContainerSelect.use(addChild(alert));
  return alert.use(
    toastAction(delay)
  );
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
