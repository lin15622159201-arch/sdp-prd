# 快速接入

```html
    <photo-editor
      url="https://oss.yunbanfang.cn/tiangong_b0cc0c237b0544948bd209759362eada.jpg"
      @save="handleSave"
    />
```

| 参数名    | 必填  | 描述       | 返回数据   | 类型     |
| ------ | --- | -------- | ------ | ------ |
| url    | 是   | 原图地址     |        | string |
| save   | 否   | 点击完成保存数据 | string | method |
| cancel | 否   | 点击取消触发   | void   | method |
