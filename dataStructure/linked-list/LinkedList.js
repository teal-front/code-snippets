/**
 * Linked List: 链表
 * from: http://wuzhiwei.net/ds_app_linkedlist/
 */
function ListNode ( data ) {
    this.data = data;
    this.next = null;
}
function LinkedList () {
    this.head = null;
    //use tail for efficiency
    this.tail = null;
}
LinkedList.prototype.find = function( element ) {
    var p = this.head;
    while( p != null && p.data != element ) {
        p = p.next;
    }
    return p;
};
LinkedList.prototype.insertAfterNode = function( element, node ) {
    if( node == null ) return;
    var n = new ListNode( element );
    n.next = node.next;
    node.next = n;
    if( node == this.tail ) {
        this.tail = n;
    }
};
LinkedList.prototype.insertAfter = function( element, data ) {
    this.insertAfterNode( element, this.find(data) );
};
LinkedList.prototype.findPrevious = function( element ) {
    var prev = null;
    var cur = this.head;
    while( cur != null && cur.data != element ) {
        prev = cur;
        cur = cur.next;
    }
    return [prev, cur];
};
LinkedList.prototype.addFirst = function( element ) {
    var h = new ListNode( element );
    h.next = this.head
    // 原本是空的链
    if( this.head == null ) {
        this.tail = h;
    }
    this.head = h;
};
LinkedList.prototype.insertBefore = function( element, data ) {
    if( this.head == null ) return;
    if( this.head.data === data ) {
        this.addFirst( element );
        return;
    }
    var p = this.findPrevious( data );
    var prev = p[0];
    var cur = p[1];
    if( cur != null ) {
        var n = new ListNode( element );
        prev.next = n;
        n.next = cur;
    }
};
LinkedList.prototype.delete = function( element ) {
    if( this.head.data == element ) {
        this.head = this.head.next;
        return;
    }
    var p = this.findPrevious( element );
    var prev = p[0];
    var cur = p[1];
    if( prev != null && cur != null ) {
        prev.next = cur.next;
    }
};
LinkedList.prototype.reverse = function() {
    var p = this.head;
    if( p == null ) return null;
    this.tail = p;
    var tmp, q = p.next;
    while( q != null ) {
        tmp = q.next;
        q.next = p;
        p = q;
        q = tmp;
    }
    this.head.next = null;
    this.head = p;
    return this;
};