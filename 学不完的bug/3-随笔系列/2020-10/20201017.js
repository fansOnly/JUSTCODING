function Parent() {
    this.name = 'parent';
}
function Child() {
    Parent.call(this);
    this.type = 'children';
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child

const child = new Child()
console.log(child)
console.log(child.constructor) // Child
