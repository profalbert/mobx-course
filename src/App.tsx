import { CounterFunction } from './components/CounterFunction'

// прокидываем здесь store через глобальную область видимости,
// но можем также перекинуть через props, контекст или через хук,
// который внутри себя использует контекст
// const storeFunction = CounterStoreFunction()

const App: React.FC = () => {
  return (
    <div className='App'>
      <div>
        <CounterFunction initialCount={2} />
      </div>
    </div>
  )
}

export default App
