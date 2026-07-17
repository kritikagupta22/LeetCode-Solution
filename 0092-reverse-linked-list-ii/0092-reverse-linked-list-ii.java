class Solution {

    public ListNode reverseBetween(ListNode head, int left, int right) {

        if(head == null || left == right){
            return head;
        }

        ListNode dummy = new ListNode(0);
        dummy.next = head;

        ListNode prevLeft = dummy;

        for(int i = 1; i < left; i++){
            prevLeft = prevLeft.next;
        }

        ListNode leftNode = prevLeft.next;

        ListNode rightNode = leftNode;

        for(int i = 0; i < right - left; i++){
            rightNode = rightNode.next;
        }

        ListNode rightNext = rightNode.next;

        ListNode prev = rightNext;
        ListNode curr = leftNode;

        while(curr != rightNext){

            ListNode next = curr.next;

            curr.next = prev;

            prev = curr;

            curr = next;
        }

        prevLeft.next = prev;

        return dummy.next;
    }
}