/**
 * 深拷贝：将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象
 *  浅拷贝：  创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，
 * 拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。
 */
{
  JSON.parse(JSON.stringify());
}

{
  function deepClone(obj = {}, map = new Map()) {
    if (typeof obj !== "object") {
      return obj;
    }
    if (map.get(obj)) {
      return map.get(obj);
    }
    let result = {};
    if (
      obj instanceof Array ||
      Object.prototype.toString(obj) === "[object Array]"
    ) {
      result = [];
    }
    // 防止循环引用
    map.set(obj, result);
    for (const key in obj) {
      // 保证key 不是原型属性
      if (obj.hasOwnProperty(key)) {
        result[key] = deepClone(obj[key], map);
      }
    }

    return result;
  }
}

{
  function clone(target) {
    let cloneTarget = {};
    for (const key in target) {
      cloneTarget[key] = target[key];
    }

    return cloneTarget;
  }
}

{
  function clone(target) {
    if (typeof target === "object") {
      let cloneTarget = {};
      for (const key in target) {
        cloneTarget[key] = clone(target[key]);
      }
      return cloneTarget;
    } else {
      return target;
    }
  }
  const target = {
    field1: 1,
    field2: undefined,
    field3: "Conardli",
    field4: {
      child: "child",
      child2: {
        child2: "child2"
      }
    }
  };

  console.log(clone(target));
}

{
  // 兼容数组
  function clone(target) {
    if (typeof target === "object") {
      let cloneTarget = Array.isArray(target) ? [] : {};
      for (const key in target) {
        cloneTarget[key] = clone(target[key]);
      }

      return cloneTarget;
    } else {
      return target;
    }
  }
}

{
  //target.target = target;
  // 循环引用问题
  function clone(target, map = new Map()) {
    if (typeof target === "object") {
      let cloneTarget = Array.isArray(target) ? [] : {};
      if (map.get(target)) {
        return map.get(target);
      }
      map.set(target, cloneTarget);
      for (const key in target) {
        cloneTarget[key] = clone(target[key], map);
      }
      return cloneTarget;
    } else {
      return target;
    }
  }
}

{
  // 要拷贝的对象非常庞大时，使用Map会对内存造成非常大的额外消耗，而且我们需要手动清除Map的属性才能释放这块内存，而WeakMap会帮我们巧妙化解这个问题。
  // 使用WeakMap
  function clone(target, map = new WeakMap()) {
    if (typeof target === "object") {
      let cloneTarget = Array.isArray(target) ? [] : {};
      if (map.get(target)) {
        return map.get(target);
      }
      map.set(target, cloneTarget);
      for (const key in target) {
        cloneTarget[key] = clone(target[key], map);
      }
      return cloneTarget;
    } else {
      return target;
    }
  }
}

{
  // 每一个引用类型都有toString方法，默认情况下，toString()方法被每个Object对象继承。如果此方法在自定义对象中未被覆盖，toString() 返回 "[object type]"，其中type是对象的类型。

  const mapTag = "[object Map]";
  const setTag = "[object Set]";
  const arrayTag = "[object Array]";
  const objectTag = "[object Object]";
  const boolTag = "[object Boolean]";
  const dateTag = "[object Date]";
  const errorTag = "[object Error]";
  const numberTag = "[object Number]";
  const regexpTag = "[object RegExp]";
  const stringTag = "[object String]";
  const symbolTag = "[object Symbol]";
  const argsTag = "[object Arguments]";

  const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

  function isObject(target) {
    const type = typeof target;
    return target !== null && (type === "object" || type === "function");
  }

  function getType(target) {
    return Object.prototype.toString.call(target);
  }

  function forEach(array,iteratee) {
      let index = -1
      const length = array.length
      while(++index<length) {
          iteratee(array[index],index)
      }

      return array
  }

  function getInit(target){
      const Ctor = target.constructor;
      return new Ctor()
  }



  function clone(target, map = new WeakMap()) {
    // 克隆原始类型
    if (!isObject(target)) {
      return target;
    }

    // 初始化
    const type = getType(target);
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target,type)
    }

    // 防止循环引用
    if(map.get(target)){
        return target
    }
    map.set(target,cloneTarget)

    // 克隆set
    if(type === setTag){
        target.forEach(value => {
            cloneTarget.add(clone(value))
        })
        return cloneTarget
    }

    // 克隆map
    if(type === mapTag){
        target.forEach((value,key) => {
            cloneTarget.set(key,clone(value))
        })
        return cloneTarget
    }

    // 克隆对象和数组
    const keys = type === arrayTag?undefined:Object.keys(target)
    forEach(keys || target,(value,key) => {
        if(keys){
            key = value
        }
        cloneTarget[key] = clone(target[key],map)
    })
    return cloneTarget

  }
}


