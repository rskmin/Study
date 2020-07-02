package parser.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 优先级次序表
 */
public class PriorityTable {
    private List<List<String>> table = new ArrayList<>();

    public PriorityTable() {
        table.add(Arrays.asList("&", "|", "^"));
        table.add(Arrays.asList("==", "!=", ">", "<", ">=", "<="));
        table.add(Arrays.asList("+", "-"));
        table.add(Arrays.asList("*", "/"));
        table.add(Arrays.asList("<<", ">>"));
    }

    /**
     * 获取优先级数量
     * @return
     */
    public int size() {
        return table.size();
    }

    /**
     * 获取某一优先级列表
     * @param level
     * @return
     */
    public List<String> get(int level) {
        return table.get(level);
    }
}
