import { CounterClass } from './components/CounterClass'
import { CounterStoreClass } from './store/CounterStoreClass'

// прокидываем здесь store через глобальную область видимости,
// но можем также перекинуть через props, контекст или через хук,
// который внутри себя использует контекст
const storeClass = new CounterStoreClass()

const AppOnClass = () => {
  return (
    <div className='App'>
      <div>
        <CounterClass initialCount={3} store={storeClass} />
      </div>
    </div>
  )
}

window.storeClass = storeClass

export default AppOnClass
