const LinkedList = require('./linkedList');
class Stack extends LinkedList {
    constructor() {
        super();
    }
    push(element) {
        this.add(element);
    }
    pop() {
        if (this.isEmptyList()) {
            return null;
        } else {
            return this.remove();
        }
    }
    peek() {
        if (this.isEmptyList()) {
            return null;
        } else {
            return this.getHead().getElement();
        }
    }
}
module.exports = Stack;
