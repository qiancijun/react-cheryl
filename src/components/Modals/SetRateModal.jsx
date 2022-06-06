import React, { forwardRef, useImperativeHandle } from 'react'
import { Modal, Form, Select, Input, message, Tooltip } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next'

const { Option } = Select;

const SetRateModal = forwardRef((props, ref) => {
    const [pattern, setPattern] = React.useState("");
    const [methodName, setMethodName] = React.useState("");
    const [type, setType] = React.useState("");
    const [methodInfo, setMethodInfo] = React.useState({});
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [volumn, setVolumn] = React.useState("");
    const [speed, setSpeed] = React.useState("");
    const [timeout, setTimeout] = React.useState("");

    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
        showModal
    }))

    const showModal = (pattern, method) => {
        setVisible(true);
        setPattern(pattern);
        setMethodName(method)
        getMethodInfo(pattern, method);
    }

    const getMethodInfo = (pattern, method) => {
        axios.post("/methodInfo", {
            pattern,
            method
        }).then(
            ({ data }) => {
                let m = data.data.method;
                if (m.speed <= 0) { m.speed = 0 }
                setMethodInfo(m);
                setType(m.type);
                setSpeed(m.speed);
                setVolumn(m.volumn);
                setTimeout(m.timeout);
            },
            err => console.log(err)
        );
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const handleOk = () => {
        setConfirmLoading(true);
        setRate(() => {
            setVisible(false);
            setConfirmLoading(false);
        });
    }

    const setRate = (callback) => {
        const req = {
            prefix: pattern,
            pathName: methodName,
            limiterType: type,
            volumn: parseInt(volumn),
            speed: parseInt(speed),
            duration: parseInt(timeout)
        }
        axios.post('/limiter', req).then(
            ({ data }) => {
                if (data.code === 200) {
                    message.success("修改成功");
                } else {
                    message.error("修改失败" + data.msg);
                }
                callback();
            },
            err => console.log(err)
        );
    }
    const chooseType = (val) => {
        setType(val);
    }


    return (
        <Modal
            title={pattern + methodName}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                autoComplete="off"
            >
                <Tooltip placement='left' title={t('rate.info.type')}>
                    <Form.Item
                        label={t('rate.modal.type')}
                    >
                        <Select value={type} style={{ width: 140 }} onChange={chooseType}>
                            <Option value="qps">{t('rate.modal.qps')}</Option>
                            <Option value="concurrent">{t('rate.modal.concurrent')}</Option>
                        </Select>
                    </Form.Item>
                </Tooltip>
                <Tooltip placement='left' title={t('rate.info.volumn')}>
                    <Form.Item
                        label={t('rate.modal.volumn')}
                    >
                        <Input value={volumn} onChange={(e) => setVolumn(e.target.value)} />
                    </Form.Item>
                </Tooltip>
                <Tooltip placement='left' title={t('rate.info.speed')}>
                    <Form.Item
                        label={t('rate.modal.speed')}
                    >
                        <Input value={speed} onChange={(e) => setSpeed(e.target.value)} />
                    </Form.Item>
                </Tooltip>
                <Tooltip placement='left' title={t('rate.info.timeout')}>
                    <Form.Item
                        label={t('rate.modal.timeout')}
                    >
                        <Input value={timeout} onChange={(e) => setTimeout(e.target.value)} />
                    </Form.Item>
                </Tooltip>
            </Form>
        </Modal>
    )
})

export default SetRateModal;