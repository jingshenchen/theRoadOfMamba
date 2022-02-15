/**
 * 手写bind
 * bind 是返回绑定 this 之后的函数，便于稍后调用
 * bind()会返回一个新的函数，如果这个返回的新的函数作为构造函数创建一个新的对象，那么此时 this 不再指向传入给 bind 的第一个参数，而是指向用 new 创建的实例
 *  bind 可以分为多次传入
 */
Function.prototype.myBind = function(context, ...args) {
  if (!context || context === null) {
    context = window;
  }

  // 创造唯一的key值
  let fn = Symbol();
  context[fn] = this;
  let _this = this;
  const result = function(...innerArgs) {
    // 若是将bind绑定之后的函数当作构造函数，将通过new操作符使用，则不绑定传入的this，而是将this指向实例化出来的对象
    // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
    // this.__proto__ === result.prototype   //this instanceof result =>true
    // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
    if (this instanceof _this === true) {
      // 此时this指向result 的实例，这时候不需要改变this指向
      this[fn] = _this;
      // bind支持参数合并
      this[fn](...[...args, ...innerArgs]);
      delete this[fn];
    } else {
      // 如果只是作为普通函数调用，直接改变this指向为传入的context
      context[fn](...[...args, ...innerArgs]);
      delete context[fn];
    }
  };
  // 如果绑定的是构造函数，那么需要继承构造函数原型属性和方法
  // 实现继承的方式：使用Object.create
  result.prototype = Object.create(this.prototype);
  return result;
};

function Person(name, age) {
  console.log(name);
  console.log(age);
  console.log(this);
}

Person.prototype.say = function() {
  console.log(123);
};

let obj = {
  objName: "我是obj传进来的name",
  objAge: "我是obj传进来的age"
};

function normalFun(name, age) {
  console.log(name); //'我是参数传进来的name'
  console.log(age); //'我是参数传进来的age'
  console.log(this); //普通函数this指向绑定bind的第一个参数 也就是例子中的obj
  console.log(this.objName); //'我是obj传进来的name'
  console.log(this.objAge); //'我是obj传进来的age'
}

// let bindFun = Person.myBind(obj, '我是参数传入的name')
// let a = new bindFun('我是参数传进来的age')
// a.say()

// 再测试作为普通函数调用
let bindFun = normalFun.myBind(obj, '我是参数传进来的name')
 bindFun('我是参数传进来的age')
