class ListNode {
    constructor(element, next = null) {
        this.element = element;
        this.next = next;
    }
    getNext() {
        return this.next;
    }
    getElement() {
        return this.element;
    }
    setElement(ele) {
        this.element = ele;
    }
    setNext(next) {
        this.next = next;
    }
    hasNext() {
        return this.next != null;
    }
    toString() {
        var next = this.hasNext() ? this.getNext().toString() : '[]';
        return '[' + this.getElement() + ',' + next + ']';
    }
}

module.exports = ListNode;
