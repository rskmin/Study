package common;

import org.junit.jupiter.api.Test;

public class PeekIteratorTests {

    @Test
    public void test_peek() {
        String source = "abcdefg";
        PeekIterator<Character> it = new PeekIterator<Character>(source.chars().mapToObj(c -> (char)c));

        System.out.println(it.next());
        System.out.println(it.next());
        it.next();
        it.next();
        System.out.println(it.next());
        System.out.println(it.peek());
        System.out.println(it.peek());
        System.out.println(it.next());
        System.out.println(it.next());
    }

    @Test
    public void test_lookahead2() {
        String source = "abcdefg";
        PeekIterator<Character> it = new PeekIterator<Character>(source.chars().mapToObj(c -> (char)c));

        System.out.println(it.next());
        System.out.println(it.next());
        System.out.println(it.next());
        it.putBack();
        it.putBack();
        System.out.println(it.next());
        System.out.println(it.next());

    }

    @Test
    public void test_endToken() {
        String source = "abcdefg";
        PeekIterator<Character> it = new PeekIterator<Character>(source.chars().mapToObj(c -> (char)c), (char)0);

        int i = 0;
        while(it.hasNext()) {
            if (i == 7) {
                System.out.println(it.next());
            } else {
                System.out.println(source.charAt(i++) == it.next());
            }
        }
    }
}
