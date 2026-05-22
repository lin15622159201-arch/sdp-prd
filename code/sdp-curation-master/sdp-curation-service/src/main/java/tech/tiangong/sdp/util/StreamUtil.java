package tech.tiangong.sdp.util;

import cn.hutool.core.collection.CollectionUtil;
import com.google.common.collect.Lists;
import org.springframework.beans.BeanUtils;
import team.aikero.blade.core.exception.BusinessException;

import java.util.*;
import java.util.function.BinaryOperator;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Stream api工具类
 *
 * @author laihaibing
 * @since 2022/02/22
 */
public final class StreamUtil {

    private StreamUtil() {
    }

    public static <T, K> Map<K, T> it2Map(Iterable<T> iterable, Function<? super T, ? extends K> keyMapper) {
        if (iterable == null || !iterable.iterator().hasNext()) {
            return new HashMap<>();
        }
        List<T> list = Lists.newArrayList(iterable);
        return list.stream()
                .collect(Collectors.toMap(keyMapper, Function.identity(), (e1, e2) -> e1));
    }

    public static <T, K> Map<K, T> list2Map(Collection<T> list, Function<? super T, ? extends K> keyMapper) {
        if (CollectionUtil.isEmpty(list)) {
            return new HashMap<>();
        }
        return list.stream().collect(Collectors.toMap(keyMapper, Function.identity(), (e1, e2) -> e1));
    }

    public static <T, K, U> Map<K, U> list2MapWithValue(Collection<T> list, Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper) {
        if (CollectionUtil.isEmpty(list)) {
            return new HashMap<>();
        }
        return list.stream().collect(Collectors.toMap(keyMapper, valueMapper, (e1, e2) -> e1));
    }

    public static <T, K> Map<K, T> list2Map(Collection<T> list, Function<? super T, ? extends K> keyMapper, BinaryOperator<T> mergeFunction) {
        if (CollectionUtil.isEmpty(list)) {
            return new HashMap<>();
        }
        return list.stream().collect(Collectors.toMap(keyMapper, Function.identity(), mergeFunction));
    }

    public static <T, K, U> Map<K, U> list2Map(Collection<T> list, Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper) {
        if (CollectionUtil.isEmpty(list)) {
            return new HashMap<>();
        }
        return list.stream().collect(Collectors.toMap(keyMapper, valueMapper, (e1, e2) -> e1));
    }

    public static <T, R> Set<R> list2Set(Collection<T> list, Function<? super T, R> mapper) {
        if (CollectionUtil.isEmpty(list)) {
            return new HashSet<>();
        }
        return list.stream().map(mapper).collect(Collectors.toSet());
    }

    public static <T, R> boolean anyMatch(Collection<T> list, Predicate<? super T> predicate) {
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        return list.stream().anyMatch(predicate);
    }

    public static <T, K> Map<K, List<T>> groupingBy(Collection<T> list, Function<? super T, ? extends K> keyMapper) {
        if (CollectionUtil.isEmpty(list)) {
            return new HashMap<>();
        }
        return list.stream().collect(Collectors.groupingBy(keyMapper));
    }

    public static <T, K, A, D> Map<K, D> groupingBy(Collection<T> list, Function<? super T, ? extends K> keyMapper, Collector<? super T, A, D> downstream) {
        if (CollectionUtil.isEmpty(list)) {
            return new HashMap<>();
        }
        return list.stream().collect(Collectors.groupingBy(keyMapper, downstream));
    }


    public static <T, R> List<R> convertList(Collection<T> list, Function<? super T, R> mapper) {
        if (CollectionUtil.isEmpty(list)) {
            return new ArrayList<>();
        }
        return list.stream().map(mapper).collect(Collectors.toList());
    }

    public static <T, R> List<R> convertListBean(Collection<T> list, Class<R> clazz) {
        if (CollectionUtil.isEmpty(list)) {
            return new ArrayList<>();
        }
        return list.stream().map(t -> {
            try {
                R r = clazz.getDeclaredConstructor().newInstance();
                BeanUtils.copyProperties(t, r);
                return r;
            } catch (Exception e) {
                throw new BusinessException("转换失败");
            }
        }).collect(Collectors.toList());
    }

    public static <T, R> List<R> convertList(T[] arr, Function<? super T, R> mapper) {
        if (arr == null || arr.length < 1) {
            return new ArrayList<>();
        }
        return Stream.of(arr).map(mapper).collect(Collectors.toList());
    }

    public static <T, R> Set<R> convertSet(Collection<T> list, Function<? super T, R> mapper) {
        if (CollectionUtil.isEmpty(list)) {
            return new HashSet<>();
        }
        return list.stream().map(mapper).collect(Collectors.toSet());
    }

    public static <T, R> List<R> convertListAndDistinct(Collection<T> list, Function<? super T, R> mapper) {
        if (CollectionUtil.isEmpty(list)) {
            return new ArrayList<>();
        }
        return list.stream().map(mapper).distinct().collect(Collectors.toList());
    }

    public static <T> List<T> mergeList(Collection<T> list1, Collection<T> list2) {
        if (list1 == null) {
            list1 = new ArrayList<>();
        }
        if (CollectionUtil.isNotEmpty(list2)) {
            list1.addAll(list2);
        }
        return new ArrayList<>(list1);
    }

    public static <T> void forEach(Collection<T> list, Consumer<? super T> action) {
        if (list == null) {
            return;
        }
        list.forEach(action);
    }

    /**
     * 遍历集合(0-count)个，元素，并执行action；
     * 未超过list长度执行：action.accept(t,index)
     * 超过list长度执行：action.accept(null,index)
     */
    public static <T> void forIndexEach(Collection<T> list, Integer count, IndexConsumer<? super T> action) {
        if (list == null) {
            return;
        }
        for (int index = 0; index < count; index++) {
            action.accept(get(list, index), index);
        }
    }

    @SafeVarargs
    public static <T> List<T> mergeList(Collection<T>... lists) {
        if (lists == null) {
            return new ArrayList<>();
        }
        List<T> mList = new ArrayList<>();
        for (Collection<T> list : lists) {
            if (CollectionUtil.isNotEmpty(list)) {
                mList.addAll(list);
            }
        }
        return new ArrayList<>(mList);
    }

    public static <T> List<T> filter(Collection<T> list, Predicate<? super T> predicate) {
        if (CollectionUtil.isEmpty(list)) {
            return new ArrayList<>();
        }
        return list.stream().filter(predicate).collect(Collectors.toList());
    }

    public static <T, R> List<R> filterAndCovertList(Collection<T> list, Predicate<? super T> predicate, Function<? super T, R> mapper) {
        return convertList(filter(list, predicate), mapper);
    }

    public static <T> T findFirst(List<T> list) {
        if (CollectionUtil.isEmpty(list)) {
            return null;
        }
        return list.get(0);
    }

    public static <T> T findFirst(List<T> list, Predicate<? super T> predicate) {
        if (CollectionUtil.isEmpty(list)) {
            return null;
        }
        return list.stream().filter(predicate).findFirst().orElse(null);
    }


    public static String byteToString(byte[] bytes) {
        return byteToString(bytes, "UTF-8");
    }

    public static String byteToString(byte[] bytes, String charsetName) {
        String text = null;
        try {
            text = new String(bytes, charsetName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return text;
    }

    public static <T, R> List<R> distinct(Collection<T> list, Function<? super T, ? extends R> mapper) {
        if (CollectionUtil.isEmpty(list)) {
            return Lists.newArrayList();
        }
        return list.stream().map(mapper).distinct().collect(Collectors.toList());
    }

    /**
     * Stream分割list集合
     *
     * @param list      集合数据
     * @param splitSize 几个分割一组
     * @return 集合分割后的集合
     */
    public static <T> List<List<T>> splitList(List<T> list, int splitSize) {
        if (CollectionUtil.isEmpty(list)) {
            return Collections.emptyList();
        }
        if (splitSize < 1) {
            throw new BusinessException("指定分割大小不能小于1");
        }
        int maxSize = (list.size() + splitSize - 1) / splitSize;
        return Stream.iterate(0, n -> n + 1)
                .limit(maxSize)
                .parallel()
                .map(a -> list.parallelStream().skip(a * splitSize).limit(splitSize).collect(Collectors.toList()))
                .filter(b -> !b.isEmpty())
                .collect(Collectors.toList());
    }

    public static <T> List<T> sort(List<T> list, Comparator<? super T> comparator) {
        if (CollectionUtil.isEmpty(list)) {
            return list;
        }
        return list.stream().sorted(comparator).collect(Collectors.toList());
    }


    /**
     * 获取集合中指定下标的元素值，下标可以为负数，例如-1表示最后一个元素<br>
     * 如果元素越界，返回null
     *
     * @param <T>        元素类型
     * @param collection 集合
     * @param index      下标，支持负数
     * @return 元素值
     */
    public static <T> T get(Collection<T> collection, int index) {
        if (null == collection) {
            return null;
        }
        final int size = collection.size();
        if (0 == size) {
            return null;
        }
        if (index < 0) {
            index += size;
        }
        // 检查越界
        if (index >= size || index < 0) {
            return null;
        }
        if (collection instanceof List) {
            final List<T> list = ((List<T>) collection);
            return list.get(index);
        } else {
            Iterator<T> iterator = collection.iterator();
            while (iterator.hasNext()) {
                index--;
                if (-1 == index) {
                    return iterator.next();
                }
                iterator.next();
            }
            return null;
        }
    }

    public static <T> T randomGet(List<T> list) {
        if (CollectionUtil.isEmpty(list)) {
            return null;
        }
        Random random = new Random();
        int index = random.nextInt(list.size()); // 生成一个0（包含）到list.size()（不包含）的随机数
        return list.get(index); // 使用生成的随机索引获取List中的元素
    }


    /**
     * 获取list中的N个元素，并且删除原来list中的N个元素
     *
     * @param list 集合
     * @param n    获取并删除个数
     * @return 获取的元素
     */
    public static <T> List<T> remove(List<T> list, int n) {
        return remove(list, n, false);
    }

    /**
     * 随机获取list中的N个元素，并且删除原来list中的N个元素
     *
     * @param list 集合
     * @param n    获取并删除个数
     * @return 随机获取的元素
     */
    public static <T> List<T> randomRemove(List<T> list, int n) {
        return remove(list, n, true);
    }

    public static <T> List<T> remove(List<T> list, int n, boolean isRandom) {
        if (CollectionUtil.isEmpty(list)) {
            return new ArrayList<>();
        }
        if (n > list.size() || n < 0) {
            n = list.size();
        }
        List<T> eleList = new ArrayList<>();
        Random rand = new Random();
        for (int i = 0; i < n; i++) {
            int size = list.size();
            if (size == 1) {
                eleList.add(list.remove(0)); //最后一个元素了
                break;
            }
            int index = isRandom ? rand.nextInt(size) : 0;
            eleList.add(list.remove(index)); // 先获取元素，然后删除
        }
        return eleList;
    }


    public static <T> List<T> shuffle(List<T> list) {
        if (CollectionUtil.isEmpty(list)) {
            return new ArrayList<>();
        }
        Collections.shuffle(list);
        return list;
    }

    @FunctionalInterface
    public interface IndexConsumer<T> {
        void accept(T t, int index);

    }
}
