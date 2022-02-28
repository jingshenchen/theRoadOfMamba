// call
{
  Function.prototype.myCall = function(context) {
    // 判断调用对象
    if (typeof this !== "function") {
      throw new Error("Type error");
    }
    // 首先获取参数
    let args = [...arguments].slice(1);
    let result = null;
    // 判断是否有context是否传入，如果没有传就设置为window
    context = context || window;
    // 将被调用的方法设置为context的属性
    // this 即为要调用的方法
    context.fn = this;
    result = context.fn(...args);
    //删除手动增加的属性方法
    delete context.fn;
    return result;
  };

  var obj = {
    value: "vortesnail"
  };

  function fn() {
    console.log(this.value);
  }

  fn.myCall(obj); // vortesnail

  let value = 2;
  let foo = {
    value: 1
  };
  function bar(name, age) {
    return {
      value: this.value,
      name: name,
      age: age
    };
  }
  console.log(bar.myCall(foo, "Jack", 20));
}

// apply
{
  Function.prototype.myApply = function(context) {
    if (typeof this !== "function") {
      throw new Error("Type error");
    }
    let result = null;
    context = context || window;
    // 使用 Symbol 来保证属性唯一
    // 也就是保证不会重写用户自己原来定义在 context 中的同名属性
    const fnSymbol = Symbol();
    context[fnSymbol] = this;
    // 执行被调用的方法
    if (arguments[1]) {
      result = context[fnSymbol](...arguments[1]);
    } else {
      result = context[fnSymbol]();
    }
    delete context[fnSymbol];
    return result;
  };
  var obj = {
    value: "vortesnail"
  };

  function fn() {
    console.log(this.value);
  }

  fn.myApply(obj);
}

//
/**
 * bind
 * 1、指定 this
 * 2、传入参数
 * 3、返回一个函数
 * 4、柯里化
 */
{
  Function.prototype.myBind = function(context) {
    if (typeof this !== "function") {
      throw new Error("Type error");
    }
    //获取参数
    const args = [...arguments].slice(1);
    const fn = this;
    return function Fn() {
      return fn.apply(
        this instanceof Fn ? this : context,
        args.concat(...arguments)
      );
    };
  };
  fn.myBind(obj);
  console.log(fn.myBind(obj));
}

{
  Function.prototype.myBind1 = function(context) {
    if (typeof this !== "function") {
      throw new Error("Type error");
    }
    const self = this
    const args = Array.prototype.slice.call(arguments,1)
    return function(){
        let bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(context,args.concat(bindArgs))
    }
  };
}
