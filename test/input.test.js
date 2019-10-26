//do-not-remove-this-variable
const a = 1;

//remove-this-variable
const b = 2;

//do-not-remove-this-variable
const c = 3;

//do-not-remove-this-function
function d() {
  return 4;
}

//remove-this-function-start
function f() {
  return 5;
}
//remove-this-function-end

//do-not-remove-this-function
function g() {
  return 4;
}

const foo = a + d();
const bar = c + g();

console.log(foo + bar);
