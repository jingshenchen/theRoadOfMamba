// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

//     左括号必须用相同类型的右括号闭合。
//     左括号必须以正确的顺序闭合。

// 示例 1：

// 输入：s = "()"
// 输出：true

// 示例 2：

// 输入：s = "()[]{}"
// 输出：true

// 示例 3：

// 输入：s = "(]"
// 输出：false
const isValid = function(s) {
    if(s.length % 2 === 1) {
        return false
    }
    const regObj = {
        "{":"}",
        "(":")",
        "[":"]"
    }
    let stack = [];
    for(let i = 0;i<s.length;i++){
        if(s[i] === "{" || s[i] === "(" || s[i] === "["){
            stack.push(s[i])
        } else {
            const cur = stack.pop();
            if(s[i] !== regObj[cur]) {
                return false;
            }
        }
    }

    if(stack.length) {
        return false;
    }

    return true
}


console.log(isValid("(]"))
console.log(isValid("()"))