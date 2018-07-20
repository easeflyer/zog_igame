import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';
import { Icon } from 'antd';
import Calendar from 'react-calendar';
import { MonthView, YearView, DecadeView, CenturyView } from "react-calendar";


class SignIn extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => {
        console.log(date, "onchange");
        this.setState({ date })
    }

    formatMonth = (value, type) => {
        console.log(value, type);
        return value.getMonth() + 1 + "月";
    }
    onChange = date => this.setState({ date })
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onClick={() => this.props.toMine()}
                >每日签到
            </NavBar>
                <div>
                    {/* Calendar 组件 注释 文档 */}
                    <Calendar
                        onChange={this.onChange} //最小的日期发生改变时触发
                        value={this.state.date} // 日历的值 可以是 一个 Date对象，也可以是 一个 数组： [new Date(2017, 0, 1), new Date(2017, 7, 1)]
                        activeStartDate={new Date(2017, 0, 1)} // 没有设置值时，默认开始的时间（默认显示的时间）
                        calendarType="ISO 8601" //默认值 ： US ，us表示第一天是周天， 其他的 都是 ISO8601 第一天是周一
                        className="my-calendar" //在 calendar 最外层 盒子添加 类名
                        formatMonth={(value) => this.formatMonth(value, "MMM")} //自定义格式化 月份
                        maxDate={(new Date(2019, 10, 1))} //允许选择 的最大日期
                        maxDetail={"month"} // 视图中展示的最大细节，可取的值 为： "month", "year", "decade" or "century". Defaults to "month".  "month"
                        minDate={new Date()}
                        nextLabel={<div className="444">next</div>} //下一个月的图标显示 值可以是dom元素，也可以是 string类型的字符串
                        onActiveDateChange={({ activeStartDate, view }) => alert('Changed view to: ', activeStartDate, view)} //点击下一个月 或者 下一年 时触发（比较大的日期改变时触发）
                        // onClickDay={(value) => alert('Clicked day: '+ value)} //只有点击 “天” 时 触发 点击事件
                        // onClickDecade={(value) => alert('Clicked decade: ', value)}
                        // onClickMonth={(value) => alert('Clicked month: ', value)}
                        // onClickWeekNumber={(weekNumber, date) => alert('Clicked week: ', weekNumber, 'that starts on: ', date)}
                        // onClickYear={(value) => alert('Clicked year: ', value)} //点击 “年” 的时候触发
                        onDrillDown={({ activeStartDate, view }) => alert('Drilled down to: ', activeStartDate, view)}
                        returnValue="range" // 取值范围 是 ： "start", "end" or "range". 当 触发 onchange 或者 onClick事件 时，回调函数中 日期分别为 这一天的 开始时间 ，结束时间。range返回一个数组，这一天的开始时间和结束时间
                        showNavigation={true} //顶部导航 是否 显示 ，默认 true
                        showNeighboringMonth={true} //上一个 月的是否渲染
                        selectRange={false} //是否必须选取一个范围的值， 两个值之间。 默认 false
                        showWeekNumbers={false} //是否显示第几周，默认false
                        tileClassName="aa bb cc" //给按钮 增加类名 可以是 String: "class1 class2" 或者给一个数组 Array of strings: ["class1", "class2 class3"] ,可以是function ： Function: ({ date, view }) => view === 'month' && date.getDay() === 3 ? 'wednesday' : null
                        tileContent="" // 在每一个格中显示的内容 1、String: "Sample" 2、 React element: <TileContent /> 3、 Function: ({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>It's Sunday!</p> : null
                        view="month" // 默认展示的视图，月份，年份，还是 十年 世纪 "month", "year", "decade" or "century".
                    />
                </div>
                );
            </div>
        )
    }
}

export default SignIn;



