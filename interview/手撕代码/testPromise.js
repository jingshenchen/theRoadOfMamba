// promise
const MyPromise = require("./promise");

// const promise = new MyPromise((res, rej) => {
//   // res('success')
//   setTimeout(() => {
//     res("success");
//   }, 2000);

//   //   rej("err");
// });

// {
//   promise.then(
//     res => {
//       console.log("res", res);
//     },
//     rej => {
//       console.log("rej", rej);
//     }
//   );
// }

// {
//   promise.then(value => {
//     console.log("1");
//     console.log("resolve1", value);
//   });

//   promise.then(value => {
//     console.log("2");
//     console.log("resolve2", value);
//   });

//   promise.then(value => {
//     console.log("3");
//     console.log("resolve3", value);
//   });
// }

// {
//     // 解决链式调用
//     const promise = new MyPromise((resolve, reject) => {
//         resolve('success')
//     })

//     function other(){
//         return new MyPromise((resolve,reject) => {
//             resolve('other')
//         })
//     }

//     promise.then(value => {
//        console.log(1)
//        console.log('resolve',value)
//        return other()
//     }).then(value => {
//         console.log(2)
//         console.log('resolve',value)
//     })

// }

// {
//     const promise = new MyPromise((resolve,reject) => {
//         resolve(100)
//     })

//     const p1 = promise.then(value => {
//         console.log(value)
//         return p1
//     })
// }

// {
//   const promise = new MyPromise((resolve, reject) => {
//     throw new Error("执行器错误");
//   });

//   promise.then(
//     value => {
//       console.log(1);
//       console.log("resolve", value);
//     },
//     reason => {
//       console.log(2);
//       console.log(reason.message);
//     }
//   );
// }

// {
//   let promise = new MyPromise((resolve, reject) => {
//     resolve("success");
//   });

//   promise
//     .then(
//       value => {
//         console.log(1);
//         console.log("resolve", value);
//         throw new Error("then error");
//       },
//       reason => {
//         console.log(2);
//         console.log(reason.message);
//       }
//     )
//     .then(
//       value => {
//         console.log(3);
//         console.log(value);
//       },
//       reason => {
//         console.log(4);
//         console.log(reason.message);
//       }
//     );
// }
// {
//   // 不传 resolve reject
//   const promise = new Promise((resolve, reject) => {
//     resolve(100);
//   });

//   const promise1 = new MyPromise((resolve, reject) => {
//     resolve(100);
//   });
//   promise
//     .then()
//     .then()
//     .then()
//     .then(value => console.log(value));
//   promise1
//     .then()
//     .then()
//     .then()
//     .then(value => console.log(value));
// }
{
  // 实现resolve与reject 的静态调用

  MyPromise.resolve().then(() => {
    console.log(0)
    return MyPromise.resolve(4)
  }).then(res => {
    console.log(res)
  })
}