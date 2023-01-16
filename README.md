# wx-calendar

#### 介绍
微信小程序日历组件

#### 软件架构
## 一、演示地址
![demo.png](https://gitee.com/GaoWeiQiang1996/wx-calendar/raw/master/demo.png)
## 二、属性
|参数|说明|类型|默认值|
|--|--|--|--|
|defaultDate|日历默认选中的时间|String \| Date \| Number（可以被dayjs解析的格式即可）|今天|
|spot|底部需要展示小圆点的日期数组|Array<String \| Date \| Number|[]|

## 三、事件
|事件|说明|回调参数|
|--|--|--|
|bind:dateChange|选中的日期变化时触发|event.detail:{ date, month, year, dateString }|
|bind:monthChange|选中的月份变化时触发|event.detail:{ date, month, year, dateString }|
|bind:yearChange|选中的年份变化时触发|event.detail:{ date, month, year, dateString }|