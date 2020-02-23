// https://wanago.io/2020/01/20/javascript-design-patterns-observer-typescript/

interface IObserver {
    update: (message: any) => void
}

class Subject {
    private observers = new Set<IObserver>()

    subscribe(observer: IObserver) {
        this.observers.add(observer)
    }
    notity(message: string) {
        this.observers.forEach(observer => {
            observer.update(message)
        })
    }
    unsubcribe(observer: IObserver) {
        this.observers.delete(observer)
    }
}

class MyObserver implements IObserver {
    update(msg: string) {
        console.log(msg)
    }
}

// use
let subject = new Subject()
let myObserver = new MyObserver()

subject.subscribe(myObserver)
subject.notity('hello ts')