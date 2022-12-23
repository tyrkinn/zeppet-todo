import type { Action } from "@zeppet/core";

export const addChild = <T extends HTMLElement>(child: T): Action<T> => element => {
  element.appendChild(child);
  return element;
}

export const useTimeout = <T extends HTMLElement>(delay: number, action: Action<T>): Action<T> => element => {
  const timeout = setTimeout(() => {
    action(element);
    clearTimeout(timeout)
  }, delay)
  return element;
}

export const removeElement = (element: HTMLElement) => {
  element.parentNode!.removeChild(element);
}

export const removeWithDelay = <T extends HTMLElement>(delay: number): Action<T> => element => {
  setTimeout(() => removeElement(element), delay)
  return element;
}
