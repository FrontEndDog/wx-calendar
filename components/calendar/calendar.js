// components/calendar/calendar.js
const dayjs = require("./dayjs")
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //底下需要展示小圆点的日期数组
    spot: {
      type: Array,
      value: []
    },
    //组件渲染时默认选中的时间
    defaultDate: {
      type: String,
      optionalTypes: [Date, Number],
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dateList: [], //日历主体渲染数组
    selectDay: {}, //选中时间
    open: true, //日历是否展开
    transform: 0 //收起时日历高度偏移倍数
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //picker设置月份
    editMonth(e) {
      const arr = e.detail.value.split("-")
      this.setDate(parseInt(arr[0]), parseInt(arr[1]) - 1)
    },
    //上月切换按钮点击
    lastMonth() {
      const lastMonth = dayjs(new Date(this.data.selectDay.year, this.data.selectDay.month - 1))
      this.setDate(lastMonth.year(), lastMonth.month())
    },
    //下月切换按钮点击
    nextMonth() {
      const nextMonth = dayjs(new Date(this.data.selectDay.year, this.data.selectDay.month + 1))
      this.setDate(nextMonth.year(), nextMonth.month())
    },
    //设置选中日期
    setDate(paramYear, paramMonth, paramDate) {
      const date = Math.min(dayjs(`${paramYear}-${paramMonth + 1}`).daysInMonth(), this.data.selectDay.date)
      const time = dayjs(`${paramYear}-${paramMonth + 1}-${paramDate || date}`)
      const selectDay = {
        year: paramYear,
        month: paramMonth,
        date: paramDate || date,
        dateString: time.format("YYYY-MM-DD"),
      }
      //设置收起时的日历主体偏移量
      let dateListStart = dayjs(`${paramYear}-${paramMonth + 1}`).day(0)
      this.setData({
        transform: dayjs(`${paramYear}-${paramMonth + 1}-${paramDate || date}`).day(0).diff(dateListStart, 'week')
      })
      if (paramYear !== this.data.selectDay.year) {
        this.setData({
          selectDay,
          open: true
        })
        this.dateListInit(paramYear, paramMonth)
        this.triggerEvent("dateChange", this.data.selectDay)
        this.triggerEvent("monthChange", this.data.selectDay)
        this.triggerEvent("yearChange", this.data.selectDay)
        return
      }
      if (paramMonth !== this.data.selectDay.month) {
        this.setData({
          selectDay,
          open: true
        })
        this.dateListInit(paramYear, paramMonth)
        this.triggerEvent("dateChange", this.data.selectDay)
        this.triggerEvent("monthChange", this.data.selectDay)
        return
      }
      if (paramDate && paramDate !== this.data.selectDay.date) {
        this.setData({
          selectDay
        })
        this.triggerEvent("dateChange", this.data.selectDay)
      }

    },

    //展开收起
    openChange() {
      this.setData({
        open: !this.data.open
      })
    },

    //日历主体的渲染方法
    dateListInit(paramYear = this.data.selectDay.year, paramMonth = this.data.selectDay.month) {
      let dateList = []; //需要遍历的日历数组数据
      let startDate = dayjs(`${paramYear}-${paramMonth + 1}`).day(0) //日历渲染开始日期
      let endDate = dayjs(`${paramYear}-${paramMonth + 1}`).endOf('month').day(6) //日历主体渲染结束日期
      const timeArr = this.data.spot.map(item => {
        return dayjs(item).format('YYYY-MM-DD')
      }) //底部小圆点需要展示的数组
      while (startDate < endDate) {
        const dateString = startDate.format("YYYY-MM-DD")
        dateList.push({
          date: startDate.date(),
          month: startDate.month(),
          year: startDate.year(),
          dateString,
          spot: timeArr.indexOf(dateString) !== -1
        })
        startDate = startDate.add(1, 'day')
      }
      this.setData({
        dateList: dateList
      })
    },

    //某一天被点击时
    selectChange(e) {
      const year = e.currentTarget.dataset.year
      const month = e.currentTarget.dataset.month
      const date = e.currentTarget.dataset.date
      this.setDate(year, month, date)
    }
  },
  //组件生命周期
  lifetimes: {
    attached() {
      let now = this.data.defaultDate ? dayjs(this.data.defaultDate) : dayjs()
      this.setDate(now.year(), now.month(), now.date())
    }
  },
  //监听参数变化
  observers: {
    spot: function () {
      this.dateListInit()
    }
  }
})