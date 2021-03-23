var scope = "global scope";
function checkscope() {
 var scope = "local scope";
 function f() {
  return scope;
 }
 return f();
}
console.log(checkscope()) // local scope


function checkscope2() {
 var scope = "local scope";
 function f() {
  return scope;
 }
 return f;
}
console.log(checkscope2()()) // local scope

var checkscope3 = checkscope2()

console.log(checkscope3()) // local scope
