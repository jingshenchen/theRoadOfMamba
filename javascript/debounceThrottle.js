
/**
 *  防抖
 *  事件触发动作完成后一段时间触发一次
 * @param {*} fn 
 * @param {*} delay 
 */
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


/**
 *  节流
 *  事件触发后每隔一段时间触发一次，可触发多次
 * @param {*} fn 
 * @param {*} delay 
 */
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

