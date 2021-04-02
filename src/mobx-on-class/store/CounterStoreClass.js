// реакции такие как: autorun, when, reaction
// можно использовать и в компонентах UI
import { makeAutoObservable, autorun, when, reaction } from 'mobx'

export class CounterStoreClass {
  count = 0

  // computed
  get color() {
    return this.count > 0 ? 'green' : this.count < 0 ? 'red' : 'black'
  }

  constructor() {
    // makeObservable(this, {
    //   count: observable,
    //   color: computed,
    //   dec: action,
    //   inc: action,
    // })

    // makeAutoObservable похож на makeObservable,
    // но он определяет все свойства объекта по умолчанию (observable или computed иди action)
    makeAutoObservable(this)

    // autorun - это функция (реакция) автозапуска принимает одну функцию,
    // которая должна запускаться каждый раз, когда наблюдаются
    // какие-либо изменения наблюдаемого состояния (все используемые
    // параметры, они определяются автоматически из второй функции), на то,
    // что вы аннотировали наблюдаемым или вычисленным.
    // Он также запускается один раз при создании самого автозапуска.
    autorun(() => `autorun in storeClass, count: ${this.count}`)

    // when - это функция (реакция) наблюдает и выполняет заданную функцию
    // предиката (первая функция), пока она не вернет истину.
    // Как только это произойдет, данная функция эффекта (вторая функция)
    // будет выполнена, и средство автозапуска будет удалено.
    // Данная функция срабатываешь лишь один раз.
    when(
      () => this.count > 5,
      () => `when in storeClass, count: ${this.count} > 5`,
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
      () => this.count,
      (count, prevCount) => {
        if (count > 7) {
          // уничтожаем нашу reaction
          disposer()
        }
        return `reaction in storeClass, prevCount: ${prevCount}, count: ${count}`
      },
    )

    // this.state = {
    //   count: this.props.initialCount,
    // }
  }

  dec = () => (this.count += -1)
  inc = () => (this.count += +1)
}
