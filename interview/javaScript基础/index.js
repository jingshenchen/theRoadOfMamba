/**
 * 数据类型
 *  原始类型：boolean number string undefined null symbol bigint 
 *  对象类型： Object(Array、RegExp、Math、Map、Set) Function
 *  原始类型存储在栈上，对象类型存储在堆上，但是它的引用地址还是存在栈上。
 */

/**
 * 类型判断
 * typeof 原始类型除了null,其他类型都可以通过typeof来判断
 * typeof 只能具体判断函数的类型为 function，其它均为 object。
 * 
 * instanceof 内部通过原型链的方式来判断是否为构建函数的实例，常用于判断具体的对象类型
 * 
 * 直接通过构建函数来判断类型： [].constructor === Array
 * 
 * Object.prototype.toString  能判断所有的数据类型
 * 
 * Array.isArray()
 * 
 * isNaN
 */

{
  console.log("----------------类型判断----------------");
  console.log(typeof 1);
  console.log(typeof undefined);
  console.log(typeof Symbol("1"));
  console.log(typeof null);

  console.log([] instanceof Array);
  console.log([].constructor === Array);

  console.log(Object.prototype.toString.call([]));
  console.log(Object.prototype.toString.call(""));
  console.log("--------------------------------");
}

/**
 * 类型转换
 *  强制转换   转成特定的类型
 *      转布尔值规则：1、undefined、null、false、NaN、''、0、-0、都转为false; 2、其他所有值都转为true,包括所有对象
 *  
 *      转数字规则：1、true为1，false为0；2、null为0，undefined为NaN,symbol报错 ；2、字符串看内容，如果是数字或者进制值就正常转，否则就 NaN
 *  
 *  隐式转换
 *      1.对象转基本类型
 *      2.四则运算符
 * 
 */
{
  console.log("----------------类型转换----------------");
  console.log(Number(false));
  console.log(Number("1"));
  console.log(Number("ab"));
  console.log(Number(false));
  console.log(Number(undefined));

  console.log((1).toString());

  console.log(Boolean(undefined));
  console.log(Boolean(null));
  console.log(Boolean(-0));
  console.log("--------------------------------");
}

/**
 * this     this指向什么，完全取决于 什么地方以什么方式调用，而不是 创建时
 * 1.默认绑定 
 * 2.隐式绑定
 * 3.显示绑定  call apply bind
 *  3.1 call从第二个参数开始所有的参数都是 原函数的参数。
 *  3.2 apply只接受两个参数，且第二个参数必须是数组，这个数组代表原函数的参数列表。
 *  3.3 bind只有一个函数，且不会立刻执行，只是将一个值绑定到函数的this上,并将绑定好的函数返回
 * 4.new 绑定
 * 5.普通函数
 * 6.箭头函数
 */
{
  console.log("----------------this----------------");
  console.log("默认绑定");
  function foo() {
    var a = 1;
    console.log(this.a); //输出是10，在浏览器中输出
  }
  var a = 10;
  foo(); // 此时默认绑定一般是window上，严格模式下 是undefined。
  console.log("隐式绑定");
  function foo1() {
    console.log(this.a);
  }
  var obj = {
    a: 10,
    foo1: foo1
  };
  foo();
  obj.foo1(); //函数foo执行的时候有了上下文对象，即 obj。这种情况下，函数里的this默认绑定为上下文对象，等价于打印obj.a
  console.log("显性绑定");
  function foo2(a, b) {
    console.log(a + b);
  }
  foo2.call(null, "海洋", "饼干"); // 海洋饼干  这里this指向不重要就写null了
  foo2.apply(null, ["海洋", "饼干"]); // 海洋饼干

  function foo3() {
    console.log(this.a);
  }

  var obj3 = {
    a: 10
  };
  foo3.call(obj3);
  console.log("new绑定");
  function foo4() {
    this.a = 10;
    console.log(this);
  }
  foo4();
  //   console.log(window.a)
  var obj = new foo();
  console.log(obj.a);
  console.log("箭头函数");
  var a = 1;
  const fn = () => {};
  console.log("------------例子1-------------");
  var x = 10;
  var objExample = {
    x: 20,
    f: function() {
      console.log(this.x); // 20
      // 典型的隐性绑定,这里 f 的this指向上下文 obj ,即输出 20
      function foo() {
        console.log(this.x);
      }
      foo(); // 10
      //有些人在这个地方就想当然的觉得 foo 在函数 f 里,也在 f 里执行，
      //那 this 肯定是指向obj 啊 , 仔细看看我们说的this绑定规则 , 对应一下很容易
      //发现这种'光杆司令'，是我们一开始就示范的默认绑定,这里this绑定的是window
    }
  };
  objExample.f();
  console.log("------------例子2-------------");
  function foo5(arg) {
    this.a = arg;
    return this;
  }

  var a = foo5(1);
  var b = foo5(10);

  console.log(a.a); // ?  undefined
  console.log(b.a); // ?  10
  console.log("--------------------------------");
}

/**
 * 闭包 假如一个函数能访问外部的变量，那么这个函数它就是一个闭包，而不是一定要返回一个函数
 */
{
  console.log("----------闭包------------");
  let a = 1;
  function fn() {
    console.log(a);
  }

  function fn1() {
    let a = 1;
    return () => {
      console.log(a);
    };
  }
  const fn2 = fn1();
  fn2();
}

/**
 * new 
 * 1.新生成了一个对象
 * 2.对象连接到构造函数原型上，并绑定 this
 * 3.执行构造函数代码
 * 4.返回新对象
 * 当在构造函数中返回一个对象时，内部创建出来的新对象就被我们返回的对象所覆盖，所以一般来说构建函数就别返回对象了（返回原始类型不影响）。
 **/
{
  console.log("new");
  function Test(name) {
    this.name = name;
    console.log(this);
    return {
      age: 26
    };
  }

  const t = new Test("yck");
  console.log(t);
  console.log(t.name);
}

/**
 * 作用域
 *   1.全局作用域
 *   2.函数作用域
 *   3.块级作用域 ES6 中的 let、const 就可以产生该作用域
 */

/**
 * 原型
 *  1.所有对象都有一个属性 __proto__ 指向一个对象，也就是原型
 *  2.每个对象的原型都可以通过 constructor 找到构造函数，构造函数也可以通过 prototype 找到原型
 *  3.所有函数都可以通过 __proto__ 找到 Function 对象；所有对象都可以通过 __proto__ 找到 Object 对象
 *  4.对象之间通过 __proto__ 连接起来，这样称之为原型链。当前对象上不存在的属性可以通过原型链一层层往上查找，直到顶层 Object 对象，再往上就是 null 了
 */

/**
 * 继承
 *   1.原型链继承
 *   2.借用构造函数继承  优点： 1.避免了引用类型的属性被所有实例共享 2.可以在 Child 中向 Parent 传参  缺点：1.方法都在构造函数中定义，每次创建实例都会创建一遍方法。
 * 
 */
{
  console.log("------------继承---------");
  class Person {}
  console.log(Person instanceof Function);
  console.log("---------原型链继承---------------");
  function Parent() {
    this.name = "kevin";
  }
  Parent.prototype.getName = function() {
    console.log(this.name);
  };

  function Child() {}

  Child.prototype = new Parent();

  var child = new Child();

  console.log(child.getName());

  console.log("---------借用构造函数继承---------------");
  function Parent1() {
    this.names = ["kevin", "daisy"];
  }

  function Child1() {
    Parent1.call(this);
  }
  var child1 = new Child1();
  child1.names.push("yayu");
  console.log(child1.names);
  var child2 = new Child1();
  console.log(child2.names);

  console.log("---------组合继承---------------");
  function Parent2(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }

  Parent2.prototype.getName = function() {
    console.log(this.name);
  };

  function Child2(name, age) {
    Parent2.call(this, name);
    this.age = age;
  }

  Child2.prototype = new Parent2();
  Child2.prototype.constructor = Child2();

  var child3 = new Child2("kevin", "18");
  child3.colors.push("black");

  console.log(child3.name); // kevin
  console.log(child3.age); // 18
  console.log(child3.colors); // ["red", "blue", "green", "black"]

  var child4 = new Child2("daisy", "20");

  console.log(child4.name); // daisy
  console.log(child4.age); // 20
  console.log(child4.colors); // ["red", "blue", "green"]

  console.log("---------原型式继承---------------");
  function createObj(o) {
    function F() {}
    F.prototype = o;
    return new F();
  }

  var person = {
    name: "kevin",
    friends: ["daisy", "kelly"]
  };

  var person1 = createObj(person);
  var person2 = createObj(person);

  person1.name = "person1";
  console.log(person2.name);

  person1.friends.push("taylor");

  console.log(person2.friends);

  console.log("---------寄生式继承---------------");

  function createObj1(o) {
    var clone = Object.create(o);
    clone.sayName = function() {
      console.log("hi");
    };
    return clone;
  }
  console.log("---------寄生式组合继承---------------");
  function Parent4(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }

  Parent4.prototype.getName = function() {
    console.log(this.name);
  };

  function Child4(name, age) {
    Parent4.call(this, name);
    this.age = age;
  }
  var F = function() {};
  F.prototype = Parent4.prototype;
  Child4.prototype = new F();
  var child5 = new Child4("kevin", "18");
  console.log(child5);
}

/**
 * 深浅拷贝
 *  1.浅拷贝   两个对象第一层的引用不相同就是浅拷贝的含义
 *  2.深拷贝   两个对象内部所有的引用都不相同就是深拷贝的含义。
 */
{
  console.log("----------浅拷贝---------");
  let a = {
    age: 1
  };

  let b = Object.assign({}, a);
  a.age = 2;
  console.log(b.age);

  b = { ...a };
  a.age = 3;
  console.log(b.age);

  console.log("----------深拷贝---------");
}

/**
 * promise
 *  1.链式调用中，只有前一个 then 的回调执行完毕后，跟着的 then 中的回调才会被加入至微任务队列
 *  2.同一个 Promise 的每个链式调用的开端会首先依次进入微任务队列。
 */
{
  console.log("-------同一个promise-----------");
  //   let p1 = Promise.resolve();

  //   p1
  //     .then(() => {
  //       console.log("then1");
  //       Promise.resolve().then(() => {
  //         console.log("then1-1");
  //       });
  //     })
  //     .then(() => {
  //       console.log("then1-2");
  //     });

  //     p1.then(() => {
  //         console.log("then2")
  //     })

  console.log("-------不是同一个promise-----------");
  //  let p2 = Promise.resolve().then(() => {
  //      console.log('then1')
  //      Promise.resolve().then(() => {
  //          console.log("then1-1");
  //      })
  //  }).then(()=>{
  //      console.log("then2")
  //  })

  //  p2.then(()=>{
  //      console.log("then3")
  //  })

  console.log("---------复杂promise------------");
  Promise.resolve().then(() => {
    console.log("then1");
    Promise.resolve()
      .then(() => {
        console.log("then1-1");
        return 1;
      })
      .then(() => {
        console.log("then1-2");
      });
  }).then(()=>{
      console.log('then2')
  }).then(()=>{
      console.log('then3')
  }).then(()=>{
      console.log('then4')
  })
}

/**
 * 事件循环
 *   1.Task（宏任务）：同步代码、setTimeout 回调、setInteval 回调、IO、UI 交互事件、postMessage、MessageChannel。
 *   2.MicroTask（微任务）：Promise 状态改变以后的回调函数（then 函数执行，如果此时状态没变，回调只会被缓存，只有当状态改变，缓存的回调函数才会被丢到任务队列）、
 * Mutation observer 回调函数、queueMicrotask 回调函数（新增的 API）。
 *
 **/
