import './style.css';
import { observe, compose, selectOne, use } from '@zeppet/core';
import { addClass, bindInput, listIn, setText, listen } from '@zeppet/actions';
import { useToast } from './toast';

const todosObs = observe(['Drink coffee', 'Shab smoke']);
const inputText = observe('');
const toast = useToast(selectOne("#toasts")!, 2000)

const addTodo = () => {
  const inputValue = inputText.getValue().trim();
  if (inputValue.length === 0) {
    toast('Input field cannot be empty');
    return;
  }
  todosObs.mutate(prev => [...prev, inputValue]);
  inputText.mutate(() => '');
  toast('Todo added');
}

use(
  selectOne("#list")!,
  addClass('flex', 'flex-col', 'gap-2'),
  listIn(todosObs, (item, listItem) =>
    compose(
      setText(item),
      addClass('w-full', 'bg-gray-900', 'text-gray-200', 'rounded-md', 'py-4', 'px-3')
    )(listItem),
  )
)

use(
  selectOne<HTMLInputElement>('#input')!,
  bindInput(inputText),
  listen('keydown', (e) => e.key === 'Enter' && addTodo())
)

use(
  selectOne('#addBtn')!,
  listen('click', addTodo)
)
