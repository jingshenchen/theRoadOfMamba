// 从原型到原型链

{
  function Person() {}
  let person = new Person();
  person.name = "Kevin";
  console.log(person.name);
}

{
  //函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型，也就是这个例子中的 person1 和 person2 的原型。
  // 原型：每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。
  function Person() {}
  Person.prototype.name = "Kevin";
  let person1 = new Person();
  let person2 = new Person();
  console.log(person1.name);
  console.log(person2.name);
}

{
  // 每一个JavaScript对象(除了 null )都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。
  function Person() {}
  let person = new Person();
  console.log(person.__proto__ === Person.prototype);
  console.log(Object.getPrototypeOf(person) === Person.prototype);
}

{
  // constructor
  //每个原型都有一个 constructor 属性指向关联的构造函数
  function Person() {}
  console.log(Person === Person.prototype.constructor);
}

{
  //实例与原型
  function Person() {}
  Person.prototype.name = "Kevin";
  let person = new Person()
  person.name = 'Dasiy'
  console.log(person.name)
  delete person.name
  console.log(person.name)
  
}
