import './style.css';
import { select, observe } from '@zeppet/core';
import { addClass, bindInput, listIn, setText, addHandler } from '@zeppet/actions';
import { useToast } from './toast';

const todosObs = observe(['Drink coffee', 'Shab smoke']);
const inputText = observe('');

const toast = useToast(select("#toasts")!, 2000)

const addTodo = () => {
  todosObs.mutate(prev => [...prev, inputText.getValue()]);
  inputText.mutate(() => '');
  toast('Todo added');
}

select("#list")!.use(
  addClass('flex', 'flex-col', 'gap-2'),
  listIn(todosObs, (item, listItem) =>
    listItem.use(
      setText(item),
      addClass('w-full', 'bg-gray-900', 'text-gray-200', 'rounded-md', 'py-4', 'px-3')
    )),
)

select<HTMLInputElement>('#input')!.use(
  bindInput(inputText),
  addHandler('keydown', (e) => e.key === 'Enter' && addTodo())
)

select('#addBtn')!.use(
  addHandler('click', addTodo)
)
