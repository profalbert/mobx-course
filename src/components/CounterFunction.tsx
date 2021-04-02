import { useContext, useEffect } from 'react'
import {
  observer,
  // Observer
} from 'mobx-react-lite'
import { storeFunction } from '../store/CounterStoreFunction'
import { runInAction } from 'mobx'

// import { useLocalObservable } from 'mobx-react'
// useLocalObservable - хук, который создан только для использования
// внутри функционального компонента. Сокращение от
// часто используемого кода: const [store] =
// useState(() => observable({ /* something */}))
// Создает новый наблюдаемый объект с помощью observable
// и сохраняет его в компоненте на протяжении всего
// жизненного цикла компонента.
type PropsType = {
  initialCount: number
}

export const CounterFunction: React.FC<PropsType> = observer(
  ({ initialCount }) => {
    const store = useContext(storeFunction)
    useEffect(() => {
      // runInAction - это action, который нужен для того,
      // чтобы изменить состояние, не обязательно создавать
      // action, а можно просто обернуть "изменение состояния
      // вне action" в функцию runInAction - утилита,
      // которая нужна, чтобы создать временное действие,
      // которое вызывается немедленно. Может быть полезно в
      //  асинхронных процессах. Можно использовать прямо в
      //  UI компонентах, но не рекомендуется из-за смешении
      //  логик (отрисовка + изменяет данные).
      runInAction(() => {
        store.setCount(initialCount)
      })
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      store.fetchTodos()
      // eslint-disable-next-line
    }, [])

    if (!store.todos.length) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        {/* Если есть компонент Observer,
      то будет перерисовываться только контент
      внутри него (h2-counter), а не весь компонент */}
        {/* <Observer>
        {() => <h2 style={{ color: store.color }}>counter: {store.count}</h2>}
      </Observer> */}

        <h2 style={{ color: store.color }}>counter: {store.count}</h2>
        <button onClick={store.dec}>-</button>
        <button onClick={store.inc}>+</button>

        <ul>
          {store.todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.title}</span>
              <br />
              <span>{todo.completed.toString()}</span>
              <br />
              <span>{todo.id}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  },
)
