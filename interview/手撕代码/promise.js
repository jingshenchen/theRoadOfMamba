// promise.js
/**
 * Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行
 * Promise 会有三种状态 Pending 等待 Fulfilled 完成 Rejected 失败
 * 状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改；
 * Promise 中使用 resolve 和 reject 两个函数来更改状态；
 * then 方法内部做但事情就是状态判断 如果状态是成功，调用成功回调函数;如果状态是失败，调用失败回调函数
 */

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  //存储成功回调函数  解决then 多次调用
  onFulfilledCallback = [];

  //存储失败回调函数
  onRejectedCallback = [];

  // 储存状态的变量，初始值是pending
  status = PENDING;

  //成功
  value = null;

  // 失败
  reason = null;

  // 成功
  resolve = value => {
    //只有状态是等待时，才执行状态修改
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      // this.onFulfilledCallback && this.onFulfilledCallback(value)

      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value);
      }
    }
  };

  // 失败
  reject = reason => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      //   this.onRejectedCallback && this.onRejectedCallback(reason)
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason);
      }
    }
  };

  // then
  then(onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function'?onFulfilled:value => value
    onRejected = typeof onRejected === 'function' ?onRejected:reason =>{throw reason}
    // 解决链式调用
    // 为了链式调用这里直接创建一个promise,
    const promise2 = new MyPromise((resolve, reject) => {
      //这里的内容在执行器中，会立即执行
      if (this.status === FULFILLED) {
        // 创建一个微任务等待promise2完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value);
            // 传入resolvePromise集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === PENDING) {
        // this.onFulfilledCallback.push(onFulfilled);
        // this.onRejectedCallback.push(onRejected);
        this.onFulfilledCallback.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallback.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;

    // if (this.status === FULFILLED) {
    //   onFulfilled(this.value);
    // } else if (this.status === REJECTED) {
    //   onRejected(this.reason);
    // } else if (this.status === PENDING) {
    //   // this.onFulfilledCallback = onFulfilled
    //   // this.onRejectedCallback = onRejected
    //   this.onFulfilledCallback.push(onFulfilled);
    //   this.onRejectedCallback.push(onRejected);
    // }
  }

  static resolve (parameter) {
    // 如果传入MyPromise就直接返回
    if(parameter instanceof MyPromise){
      return MyPromise
    }
    return new MyPromise(resolve => {
      resolve(parameter)
    })
  }

  static reject(reason) {
    return new MyPromise((resolve,reject) => {
      reject(reason)
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 判断是否循环调用自己
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // 判断x是不是promise的实例对象
  if (x instanceof MyPromise) {
    // 执行x,调用then方法，目的是将其状态变为fulfilled或者rejected
    // x.then(value => resolve(value),reason => reject(reason))
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

module.exports = MyPromise;
