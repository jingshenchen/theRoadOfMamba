// 防抖
function debounce (fn,delay = 300) {
    let timer;
    return function(){
        const args = arguments;
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=> {
            fn.apply(this,args);
        }, delay);
    }
}

window.addEventListener("scroll",debounce(()=>{
    console.log(111)
},1000))

// 节流
function throttle(fn,delay) {
    let flag = true;
    return ()=>{
        if(!flag) return;
        flag = false;
        timer = setTimeout(() => {
            fn();
            flag = true
        }, delay);
    }
}

window.addEventListener("scroll",throttle(()=>{
    console.log(111)
},1000))

