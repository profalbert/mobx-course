// реакции такие как: autorun, when, reaction
// можно использовать и в компонентах UI
import {
  action,
  makeAutoObservable,
  autorun,
  when,
  reaction,
  runInAction,
} from 'mobx'
import { createContext } from 'react'

function CounterStoreFunction() {
  // makeAutoObservable похож на makeObservable,
  // но он определяет все свойства объекта
  // по умолчанию (observable или computed иди action)
  // если он что-то определил не так как надо,
  // то мы можем это исправить во втором аргументе данной функции:
  // Например, вместо action указать action.bound
  const store = makeAutoObservable(
    {
      // observable
      count: 0 as number,
      // observable
      todos: [] as Array<any>,
      // computed
      get color() {
        return this.count > 0 ? 'green' : this.count < 0 ? 'red' : 'black'
      },
      // action
      setCount(count: number) {
        this.count = count
      },
      // action
      dec() {
        this.count += -1
      },
      // action
      inc() {
        this.count += +1
      },
      // создаем обычный action, но асинхронный
      async fetchTodos() {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos',
        )
        const data = await response.json()
        runInAction(() => {
          this.todos = data
        })
      },
    },
    {
      // привязываем actions к нужному контексу
      dec: action.bound,
      inc: action.bound,
    },
  )

  // autorun - это функция (реакция) автозапуска принимает одну функцию,
  // которая должна запускаться каждый раз, когда наблюдаются
  // какие-либо изменения наблюдаемого состояния (все используемые
  // параметры, они определяются автоматически из второй функции), на то,
  // что вы аннотировали наблюдаемым или вычисленным.
  // Он также запускается один раз при создании самого автозапуска.
  autorun(() => `autorun in storeFunction, count: ${store.count}`)

  // when - это функция (реакция) наблюдает и выполняет заданную функцию
  // предиката (первая функция), пока она не вернет истину.
  // Как только это произойдет, данная функция эффекта (вторая функция)
  // будет выполнена, и средство автозапуска будет удалено.
  // Данная функция срабатываешь лишь один раз.
  when(
    () => store.count > 5,
    () => `when in storeFunction, count: ${store.count} > 5`,
  )

  // reaction - это функция (реакция) похожа на autorun,
  // но дает более детальный контроль над отслеживанием наблюдаемых.
  // Она принимает две функции: первая, функция данных, отслеживает
  // и возвращает данные, которые использует в качестве входных
  // параметров для второй функции эффекта. Важно отметить, что
  // побочный эффект реагирует только на данные, к которым
  // был получен доступ в первой функции данных,
  // которые могут быть меньше данных,
  // которые фактически используются во второй функции эффекта.
  const disposer = reaction(
    () => store.count,
    (count, prevCount) => {
      if (count > 7) {
        // уничтожаем нашу reaction
        disposer()
      }
      return `reaction in storeFunction, prevCount: ${prevCount}, count: ${count}`
    },
  )

  return store
}

// используем createContext для создания контекста
// (Provider и inject устарели из mobx-react,
// а в mobx-react-lite их вообще нет)
export const storeFunction = createContext(CounterStoreFunction())

declare var window: any
window.storeFunction = storeFunction
