---
title: echarts使用笔记
date: 2021-06-11 17:16:08

categories: echarts
---

<html>
<div style=" font-family: 楷体; box-shadow: 0px 0px 12px #777777; background-color: rgba(250, 255, 242, 0.3); padding: 5px 20px; font-size: 16px; border-radius: 5px; ">

    耶和华上帝在东方的伊甸开辟了一个园子，把她所造的人安置在里面。

</div>
</html>

## 配置

### 标题

```js
title: {
  text: "市值权益";
}
```

### Y 轴

```js
yAxis: [
  {
    type: "value",
    name: "金额",
    axisLine: {
      show: true,
      lineStyle: {
        color: colors[0],
      },
    },
  },
];
```

### 工具箱

```js
toolbox: {
    feature: {
        dataZoom: {},
        saveAsImage: {},
        dataView: {},
    }
}
```

### 滑块缩放加鼠标滚动缩放

```js
dataZoom: [
  {
    id: "dataZoomX",
    type: "inside",
    xAxisIndex: [0],
    filterMode: "filter",
  },
  {
    id: "dataZoomY",
    type: "inside",
    yAxisIndex: [0],
    filterMode: "empty",
  },
  {
    id: "dataZoomX2",
    type: "",
    xAxisIndex: [0],
    filterMode: "slider",
  },
  {
    id: "dataZoomY2",
    type: "slider",
    yAxisIndex: [0],
    filterMode: "empty",
  },
];
```

### X 轴 Value 类型

数据只能在 series 里面指定。如果是 category，可以在 xAsis 指定。

```js
{
    xAxis: {
        type: 'value',
        axisLabel: {
            formatter: function(value, index) {
                // index为第几个label， value为x坐标的值
            }
        }
    },
    series: [{
        type: 'scatter',
        symbolSize: 5,
        name: "",
        data: [
            [0, 1],
            [1, 2]
        ]
    }, ]
}
```

### X 轴范围

- min
- max

### tooltip 格式化

```js
tooltip: {
    trigger: 'axis',
    axisPointer: {
        type: 'cross',
        label: {
            formatter: function({
                axisDimension,
                value
            }) {
                // axisDimension 'x' or 'y'
            }
        }
    }
}
```

### y 轴自适应不从 0 开始

```js
yAxis: {
    type: "value",
    scale: "true"
}
```

## Echarts for React

### 基本使用

```jsx
import ReactECharts from "echarts-for-react";
const loadingOption = {
  text: "加载中...",
  color: "#4413c2",
  textColor: "#270240",
  maskColor: "rgba(194, 88, 86, 0.3)",
  zlevel: 0,
};
<ReactECharts
  option={option}
  theme={darkMode ? "dark" : ""}
  onChartReady={onChartReady}
  loadingOption={loadingOption}
  showLoading={false}
  style={{ height: height }}
/>;
```

> option 不能为 null

### 选项

- notMerge： 默认是 false， 也就是说如果重置 option，原来的 series 会被保留
- option (required, object),the echarts option config, can see https://echarts.apache.org/option.html#title.
- lazyUpdate (optional, object) when setOption, lazy update the data, default is false. See https://echarts.apache.org/api.html#echartsInstance.setOption.
- style (optional, object the style of echarts div. object, default is {height: '300px'}.
- className (optional, string) the class of echarts div. you can setting the css style of charts by class name.
- theme (optional, string) the theme of echarts. string, should registerTheme before use it (theme object format: https://github.com/ecomfe/echarts/blob/master/theme/dark.js). e.g.

  ```js
  // import echarts
    import echarts from 'echarts';
    ...
    // register theme object
    echarts.registerTheme('my_theme', {
    backgroundColor: '#f4cccc'
    });
    ...
    // render the echarts use option `theme`
    <ReactECharts
    option={this.getOption()}
    style={{height: '300px', width: '100%'}}
    className='echarts-for-echarts'
    theme='my_theme' />

  ```

- onChartReady (optional, function) when the chart is ready, will callback the function with the echarts object as it's paramter.

- loadingOption (optional, object) the echarts loading option config, can see https://echarts.apache.org/api.html#echartsInstance.showLoading.

- showLoading (optional, bool, default: false)
  bool, when the chart is rendering, show the loading mask.

- onEvents (optional, array(string=>function) )
  ```js
  const onEvents = {
  'click': this.onChartClick,
  'legendselectchanged': this.onChartLegendselectchanged
  }
      ...
      <ReactECharts
      option={this.getOption()}
      style={{ height: '300px', width: '100%' }}
      onEvents={onEvents}
      />
  ```
- opts (optional, object) the opts of echarts. object, will be used when initial echarts instance by echarts.init. Document here.

  ```js
  <ReactECharts
    option={this.getOption()}
    style={{ height: "300px" }}
    opts={{ renderer: "svg" }} // use svg to render the chart.
  />
  ```

## 折线图

X, Y 为数值的折线图

```js
series: [
  {
    name: "模拟数据",
    type: "line",
    showSymbol: false,
    hoverAnimation: false,
    data: [
      [x1, y1],
      [x2, y2],
    ],
  },
];
```

## 散点图

```js
series: [
  {
    type: "scatter",
    symbolSize: 5,
    name: data["signal-name2"],
    data: [[], []],
  },
];
```

## 图例

### 默认不显示

```js
legend: {
    selected: {
        "累计单位净值": false
    }
},
```

## 线下区域渐变色

```js
series: [
  {
    name: "单位净值",
    type: "line",
    smooth: false,
    color: "rgb(90, 154, 214)",
    symbol: "none",
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: "rgb(90, 154, 214)",
        },
        {
          offset: 1,
          color: "rgb(255, 255, 255)",
        },
      ]),
    },
    data: data?.unitWorth,
  },
];
```

## 金融 tick 数据可视化方案

1. 后台返回带时间戳的数据
2. 根据以下变量计算两个映射：时间到下标的映射和下标到时间的映射。
   - 数据开始日期
   - 数据结束日期
   - 数据粒度，如：1m，10s
   - 时间模式，如：[9:00-11:30, 13:00-15:00]
