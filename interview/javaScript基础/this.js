//顺序执行
{
    // 变量提升
  var foo = function() {
    console.log("foo1");
  };
  foo();
  var foo = function() {
    console.log("foo2");
  };
  foo();
}

{
    // 函数提升
  function foo() {
    console.log("foo1");
  }
  foo();
  function foo() {
    console.log("foo2");
  }
  foo();
}
