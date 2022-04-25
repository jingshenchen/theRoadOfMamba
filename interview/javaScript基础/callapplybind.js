{
  /**
     * call 
     * 使用一个指定的this值和单独给出的一个或多个参数来调用一个函数
     * 返回值：使用调用者提供的 this值和参数调用该函数的返回值，若该方法没有返回值，则返回undefined
     * tips：
     * 1、this参数可以传null或者undefined，此时this指向window
     * 2、this参数可以传基本类型数据，原生的call会自动用Object()转换
     * 3、函数是可以有返回值的
     * 4、将函数添加到指定对象中，并用delete删除（删除副作用）
     * 步骤：
     * 1.获取第一个参数，构建对象
     * 2.将对应函数传入该对象中
     * 3.获取参数并执行相应函数
     * 4.删除该对象中函数、消除副作用
     * 5.返回结果
     */
  function method(val1, val2) {
    return this.a + this.b + val1 + val2;
  }

  const obj = {
    a: 1,
    b: 2
  };

  console.log(method.call(obj, 3, 4));

  Function.prototype.myCall = function(context, ...args) {
    context = context ? new Object(context) : window; // new Object  == Object
    context.fn = this;
    let result = context.fn(...args);
    delete context.fn;
    return result;
  };

  console.log(method.myCall(obj, 3, 4));
}

{
  /**
     * apply
     * 调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数
     * 返回值：调用有指定this值和参数的函数的结果
     * 步骤：
     * 1.获取第一个参数，构建函数
     * 2.将对应函数传入该对象
     * 3.获取参数并执行函数
     * 4.删除函数
     * 5.返回结果
     */
  function method(val1, val2) {
    return this.a + this.b + val1 + val2;
  }

  const obj = {
    a: 1,
    b: 2
  };

  console.log(method.apply(obj, [3, 4])); // 10

  Function.prototype.myApply = function(context, arr) {
    context = context ? Object(context) : window;
    context.fn = this;
    let result = arr ? context.fn(...arr) : context.fn();
    delete context.fn;
    return result;
  };

  console.log(method.myApply(obj, [3, 4])); // 10
}

{
    /**
     * bind
     * 创建一个新的函数，在bind()被调用时，这个新函数的this被指定为bind()的第一个参数，而其余参数将作为新函数的参数，供调用时使用
     * 返回：返回一个原函数的拷贝，并拥有指定的this值和初始参数
     * tips：
     * 1.多次bind绑定无效，只会绑定在第一个上面
     * 2.bind之后，其prototype为undefined
     * 3.bind()返回值是改造参数后的原函数的拷贝，所以调用bind()的必须是函数
     * 4.使用new调用bind返回的函数时，this仍然指向该构造函数的实现
     */
     function method(val1,val2){
         return this.a + this.b + val1 + val2
     }
     const obj = {
         a:1,
         b:2
     }

     const bindMethod = method.bind(obj,3,4);
     console.log(bindMethod())
     /**
      * 步骤
      * 1.能够改变this指向
      * 2.返回的是一个函数
      * 3.能够接受多个参数
      * 4.支持柯里化传参fun(arg1)(arg2)
      * 5.获取到调用bind()返回值后，若使用new调用（当作构造函数），bind()传入的上下文context失效
      */
      Function.prototype.myBind = function(context,...args) {
          // 调用bind的必须是一个函数
          if(typeof this != 'function'){
            throw new TypeError('The bound object needs to be a function')
          }
          const self = this
          const fNOP = function(){};
          const fBound = function(...fBoundArgs) {
              // 利用apply改变this指向
              // 接受多个参数+支持柯里化传参
              // 当返回值通过new调用时，this指向当前实例（因为this是当前实例，实例的隐式原型上有fNOP的实例（fnop)fnop instanceof fNOP为true
              return self.apply(this instanceof fNOP ? this :context,[...args,...fBoundArgs])
          }
          //将调用函数的原型赋值到中转函数的原型上
          if(this.prototype){
            fNOP.prototype = this.prototype
          }

          // 通过原型的方式继承调用函数的原型
          fBound.prototype = new fNOP();

          return fBound

      }

}