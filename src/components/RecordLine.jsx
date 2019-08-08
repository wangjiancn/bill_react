import React from "react";
import 'antd/dist/antd.css';
import '../index.css'
import { Timeline } from "antd";
// 历史记录
function ChargeLine(props) {
    const chargeArr = props.chargeArr
    const TimelineItems = chargeArr.map(i => <Timeline.Item color={i.type === 'income' ? 'blue' : 'red'} dot={''} key={i._id}>{i.date} {i.acount.name}</Timeline.Item>)
    return (
        <Timeline >
            {TimelineItems}
        </Timeline>
    )
}

export default ChargeLine;
