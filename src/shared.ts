import type { Select, Action } from "@zeppet/core";

const isNodeList = <T extends HTMLElement>(element: T | NodeListOf<T>): element is NodeListOf<T> => Reflect.has(element, 'length');

export const addChild = <T extends HTMLElement>(select: Select<T>): Action<T> => element => {
  if (isNodeList(select.node)) { return element }
  element.appendChild(select.node)
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
