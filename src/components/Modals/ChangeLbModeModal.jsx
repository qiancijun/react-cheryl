import React, { forwardRef, useImperativeHandle } from 'react'
import { Modal, Form, Select } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next'

const { Option } = Select;

const ChangeLbModeModal = forwardRef((props, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [node, setNode] = React.useState({});
    const [lbMode, setLbMode] = React.useState(new Array());
    const [balance, setBalance] = React.useState("");
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
        showModal
    }));

    React.useEffect(() => {
        getBalancerMode();
        return () => {

        }
    }, []);

    const showModal = (node) => {
        console.log(node);
        setNode(node);
        setVisible(true);
    }

    const handleChange = (val) => {
        setBalance(val);
    }

    const getBalancerMode = () => {
        axios.get('/balancerMode').then(
            ({ data }) => {
                const { mode } = data.data;
                // setLbMode(data.data.mode);
                let options = [];
                for (let i in mode) {
                    const type = mode[i];
                    let dom = (
                        <Option key={type} value={type}>{t('index.modal.' + type)}</Option>
                    )
                    options.push(dom);
                }
                setLbMode(options);
            },
            err => console.log(err)
        )
    }

    const handleOk = () => {
        setConfirmLoading(true);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    return (
        <Modal
            title={t('index.modal.change_lb')}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                autoComplete="off"
            >
                <Form.Item
                    label={t('index.modal.balance')}
                >
                    <Select defaultValue={node.lb} style={{ width: 180 }} onChange={handleChange}>
                        {/* <Option value="round-robin">{t('index.modal.round-robin')}</Option> */}
                        {lbMode}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
});

export default ChangeLbModeModal