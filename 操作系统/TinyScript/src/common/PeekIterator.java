package common;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.stream.Stream;

public class PeekIterator<T> implements  Iterable<T> {

    private  Iterator<T> it;

    private  LinkedList<T> queueCache = new LinkedList<>();
    private LinkedList<T> stackPutBacks = new LinkedList<>();
    private  final static int CACHE_SIZE = 10;

    public PeekIterator(Stream<T> stream) {
        it = stream.iterator();
    }

    public T peek() {
        T val = next();
        this.putBack();
    }

    public void putBack() {

        this.stackPutBacks.push(this.queueCache.pollLast());
    }

    @Override
    public Iterator<T> iterator() {
        return null;
    }

    @Override
    public T next() {

        T val = it.next();
        while(queueCache.size() > CACHE_SIZE - 1) {
            queueCache.poll();
        }
        queueCache.add(val);
        return it.next();
    }
}
