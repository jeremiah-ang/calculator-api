const ListNode = require('./listNode');

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    getSize() {
        return this.size;
    }
    setSize(size) {
        this.size = size;
    }
    getFirst() {
        return this.getHead();
    }
    getHead() {
        return this.head;
    }
    setHead(head) {
        this.head = head;
    }
    toString() {
        if (this.isEmptyList()) {
            return '[]';
        } else {
            return this.getHead().toString();
        }
    }
    add(element) {
        this.setHead(new ListNode(element, this.getHead()));
        this.setSize(this.getSize() + 1);
    }
    addAfter(node, element) {
        node.setNext(new ListNode(element, node.getNext()));
        this.setSize(this.getSize() + 1);
    }
    remove() {
        if (this.isEmptyList()) {
            return null;
        } else {
            var newHead = this.getHead().getNext();
            var oldHead = this.getHead();
            oldHead.setNext(null);
            this.setHead(newHead);
            this.setSize(this.getSize() - 1);
            return oldHead.getElement();
        }
    }
    removeAfter(node) {}
    indexOf(element) {
        if (this.isEmptyList()) {
            return -1;
        } else {
            var node = this.getHead();
            var index = 0;
            for (var i = 0; i < this.getSize(); i++) {
                if (node.getElement() === element) {
                    return i;
                }
                node = node.getNext();
            }
            return -1;
        }
    }
    contains(element) {
        return this.indexOf(element) != -1;
    }
    append(linkedlist) {
        if (this.isEmptyList()) {
            this.setHead(linkedlist.getHead());
        } else {
            var node = this.getHead();
            for (var i = 1; i < this.getSize(); i++) {
                node = node.getNext();
            }
            node.setNext(linkedlist.getHead());
            this.setSize(this.getSize() + linkedlist.getSize());
        }
    }
    reverse() {
        function helper(xs, reversed) {
            if (xs == null) {
                return reversed;
            } else {
                var next = xs.getNext();
                xs.setNext(reversed);
                return helper(next, xs);
            }
        }
        this.setHead(helper(this.getHead(), null));
    }
    isEmptyList() {
        return this.head == null;
    }
}

module.exports = LinkedList;
