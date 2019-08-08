import React from "react";
import { DatePicker, Input, Select, Form, Row, Col, Button, TimePicker, InputNumber, Tabs, Divider } from "antd";
import 'antd/dist/antd.css';
import '../index.css'



import { getRows } from "../api/rest.js";
import { CreateRecord } from "../api/action.js";
import IconButton from "../components/iconButton";
import RecordLine from "../components/RecordLine";


const CatFormSchema = {
    name: '添加分类',
    model: 'category',
    fields: [
        {
            label: '分类名称', slug: 'name', type: Input, style: { width: 200 },
            rules: [{ required: true, message: '请输入分类名称' }]
        }
    ]
}

const AcountFormSchema = {
    name: '添加账户',
    model: 'acount',
    fields: [
        {
            label: '账户名称', slug: 'name', type: Input, style: { width: 200 },
            rules: [{ required: true, message: '账户名称' }]
        },
        {
            label: '账户余额', slug: 'balance', type: InputNumber, style: { width: 200 },
            rules: [{ required: true, message: '账户余额' }]
        }
    ]
}
class ChargeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            records: [],
            cats: [],
            acounts: [],
            currentType: 'outlay'

        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.date = values.date.format("YYYY-MM-DD")
                values.time = values.time.format("HH:mm:ss")
                values.category = this.state.cats.find(i => i._id === values.category)
                values.acount = this.state.acounts.find(i => i._id === values.acount)
                values.type = this.state.currentType
                console.log('Received values of form: ', values);
                CreateRecord(values).then(res => {
                    this.getRecords()
                })

            }
        });
    };
    getRecords = () => {
        getRows({ model: 'record' }).then(res => {
            console.log("TCL: ChargeForm -> componentDidMount -> res", res)
            this.setState({ records: res.data.objects })
        })
    }
    getAcounts = () => {
        getRows({ model: 'acount', params: { limit: 99 } }).then(res => {
            console.log("TCL: ChargeForm -> componentDidMount -> res", res)
            this.setState({ acounts: res.data.objects })
        })
    }
    getCats = () => {
        getRows({ model: 'category', params: { order: '-total_use', limit: 99 } }).then(res => {
            console.log("TCL: ChargeForm -> componentDidMount -> res", res)
            this.setState({ cats: res.data.objects })
        })
    }

    handleTabChange = (e) => {
        console.log("TCL: handleTabChange -> e", e)
        this.setState({ currentType: e })
        this.props.form.resetFields(['category'])
    }

    componentWillMount() {
        this.getRecords()
        this.getCats()
        this.getAcounts()
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="container" >
                <Tabs defaultActiveKey="outlay" onChange={this.handleTabChange}>
                    <Tabs.TabPane tab="支出" key="outlay"></Tabs.TabPane>
                    <Tabs.TabPane tab="收入" key="income"></Tabs.TabPane>
                </Tabs>
                <Form onSubmit={this.handleSubmit} layout="inline">
                    <Row gutter={24} >
                        <Col span={8}>
                            <Form.Item label="分类">
                                {getFieldDecorator('category', {
                                    rules: [{ required: true, message: '请输入分类', }],
                                })(<Select dropdownRender={(menu) => {
                                    return (
                                        <div>
                                            {menu}
                                            <Divider style={{ margin: '2px 0' }} />
                                            {<IconButton FormSchema={CatFormSchema} reload={this.getCats} type={this.state.currentType} />}
                                        </div>
                                    )
                                }}
                                    style={{ width: 180 }} >
                                    {this.state.cats.filter(i => i.type === this.state.currentType).map(i => <Select.Option value={i._id} key={i._id}>{i.name}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="日期">
                                {getFieldDecorator('date', {
                                    rules: [{ required: true, message: '请输入日期', }],
                                })(<DatePicker style={{ width: 180 }} />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="时间">
                                {getFieldDecorator('time', {
                                    rules: [{ required: true, message: '请输入时间', }],
                                })(<TimePicker style={{ width: 180 }} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24} style={{ paddingBottom: "1rem" }}>
                        <Col span={8}>
                            <Form.Item label="金额">
                                {getFieldDecorator('amount', {
                                    rules: [{ required: true, message: '请输入金额', }],
                                })(<InputNumber style={{ width: 180 }} min={0} />)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="账户">
                                {getFieldDecorator('acount', {
                                    rules: [{ required: true, message: '请输入分类', }],
                                })(<Select dropdownRender={(menu) => {
                                    return (
                                        <div>
                                            {menu}
                                            <Divider style={{ margin: '2px 0' }} />
                                            {<IconButton FormSchema={AcountFormSchema} reload={this.getAcounts} type={this.state.currentType} />}
                                        </div>
                                    )
                                }}
                                    style={{ width: 180 }} >
                                    {this.state.acounts.map(i => <Select.Option value={i._id} key={i._id}>{i.name}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="备注">
                                {getFieldDecorator('remark', {
                                    rules: [{ required: true, message: '请输入备注类', }],
                                })(<Input style={{ width: 180 }} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row type="flex" justify="end">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: 150 }}>保存</Button>
                        </Form.Item>
                    </Row>
                </Form>
                <div style={{ marginTop: "3rem" }}>
                    <p style={{ marginBottom: 20, fontWeight: 'bold' }}>最近记录:</p>
                    <RecordLine chargeArr={this.state.records}></RecordLine>
                </div>
            </div>
        )
    }
}

const Index = Form.create({ name: "chargeForm" })(ChargeForm)
export default Index;
