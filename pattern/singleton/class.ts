// class style
// https://wanago.io/2019/11/11/javascript-design-patterns-1-singleton-and-the-module/

// 非透明，有提供方法
class Singleton {
    private static instance: Singleton
    static getInstance() {
        return Singleton.instance || 
        (Singleton.instance = new Singleton())
    }
}

// 透明
class TransparentSingleton {
    static instance: TransparentSingleton
    constructor () {
        // 构造函数里不用return 值，this的值就是返回实例的值，所以直接赋this就行了
        if (TransparentSingleton.instance) {
            return TransparentSingleton.instance
        }
        TransparentSingleton.instance = this
    }
}

