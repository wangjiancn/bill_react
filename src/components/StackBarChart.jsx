import React, { PureComponent } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import { getYearReport } from "../api/action";

export default class Chart extends PureComponent {
    // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/90v76x08/';
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentWillMount() {
        getYearReport().then(res => {
            console.log("TCL: Chart -> componentWillMount -> res", res)
            this.setState({ data: res.data })
            console.log("TCL: Chart -> componentWillMount -> this.data", this.data)
        })
    }

    render() {
        return (
            <BarChart
                width={800}
                height={500}
                data={this.state.data}
                margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" stackId="a" fill="#8884d8" />
                <Bar dataKey="outlay" stackId="b" fill="#82ca9d" />
            </BarChart>
        );
    }
}



