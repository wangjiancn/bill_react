import React from "react";
import 'antd/dist/antd.css';
import '../index.css'
import { Icon, Form, Modal } from "antd";

import { createRow } from "../api/rest";



const CustomForm = Form.create({ name: "otherForm" })(
    class CreateForm extends React.Component {
        constructor(props) {
            super(props)
            this.state = {}
        }
        render() {

            const formItemLayout = {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 8 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 },
                },
            };
            const { getFieldDecorator } = this.props.form;
            const FormItems = this.props.FormSchema.fields.map(i => {
                return (
                    <Form.Item label={i.label} key={i.slug}>
                        {getFieldDecorator(i.slug, { rules: i.rules })(<i.type style={i.style}></i.type>)}
                    </Form.Item>
                )
            })
            return (
                <Modal
                    okText="保存"
                    cancelText="返回"
                    title={this.props.FormSchema.name}
                    visible={this.props.visible}
                    onOk={this.props.onSubmit}
                    onCancel={this.props.onCancel}
                >
                    <Form {...formItemLayout} >
                        {FormItems}
                    </Form>
                </Modal>
            )
        }
    }
)

class IconButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = { visible: false }
    }
    handleCancel = () => {
        console.log('Cancel')
        this.setState({ visible: false })
    }
    handleButtonClick = () => {
        console.log("TCL: IconButton -> handleButtonClick -> handleButtonClick")
        this.setState({ visible: true })
    }
    handleOk = (e) => {
        console.log("TCL: IconButton -> onSubmit -> e)", e)
        e.preventDefault()
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) { return }
            values.type = this.props.type
            console.log('Received values of form: ', values);
            console.log("TCL: IconButton -> handleOk -> this.props.FormSchema.model", this.props.FormSchema.model)
            createRow({ model: this.props.FormSchema.model, data: values }).then(res => {
                form.resetFields();
                this.setState({ visible: false });
                this.props.reload()
            }
            )
        });
    }

    saveFormRef = formRef => {
        this.formRef = formRef;
    };
    render() {
        return (
            <div>
                <div className="prefix-icon-button"
                    onClick={this.handleButtonClick}
                    onMouseDown={this.handleButtonClick}
                >
                    <Icon type='plus' style={{ paddingRight: 4 }} />添加分类
                </div>
                <CustomForm
                    FormSchema={this.props.FormSchema}
                    visible={this.state.visible}
                    wrappedComponentRef={this.saveFormRef}
                    onCancel={this.handleCancel}
                    onSubmit={this.handleOk}
                />
            </div>
        )
    }
}

export default IconButton;
