import React, { forwardRef, useImperativeHandle } from 'react'
import { Modal, Form, Input, Select, message } from 'antd';
import axios from 'axios';
import { useTranslation } from 'react-i18next'

const AddHostModal = forwardRef((props, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [pattern, setPattern] = React.useState("");
    const [host, setHost] = React.useState([]);
    const { t } = useTranslation();
    useImperativeHandle(ref, () => ({
        showModal
    }));

    React.useEffect(() => {
        return () => {

        }
    }, [])

    const showModal = (pattern) => {
        setVisible(true);
        setPattern(pattern);
    }

    const handleOk = () => {
        setConfirmLoading(true);
        axios.post('/addHost', {
            pattern,
            host
        }).then(
            ({ data }) => {
                if (data.code === 200) {
                    message.success(t('index.modal.success'))
                } else {
                    message.error(data.msg)
                }
                setVisible(false);
                props.close();
                props.getProxyInfo();
            },
            err => {
                console.log(err);
                setVisible(false);
            }
        )
    }

    const handleCancel = () => {
        setVisible(false);
    }
    return (
        <Modal
            title={t('index.modal.add_host')}
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
                    label={t('index.proxy_title')}
                >
                    <Input value={host} onChange={(e) => setHost(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    )
});

export default AddHostModal