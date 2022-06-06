import React, { forwardRef, useImperativeHandle } from 'react'
import { Modal, Radio, Form, Input } from 'antd'
import axios from 'axios';
import { message } from 'antd';
import { useTranslation } from 'react-i18next'

// let mask = "";

const AccessControlInsertModal = forwardRef((props, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [kind, setKind] = React.useState(1);
    const [ipAddress, setIpAddress] = React.useState("");
    const [mask, setMask] = React.useState("");
    const { t } = useTranslation();
    React.useEffect(() => {
        return () => {

        }
    }, [])

    useImperativeHandle(ref, () => ({
        showModal: () => showModal()
    }))

    function showModal() {
        setVisible(true);
    }

    function handleOk() {
        const { getAclList } = props;
        setConfirmLoading(true);
        // 拼接地址
        let ipNet;
        if (kind == 1) {
            ipNet = ipAddress + "/32";
        } else {
            ipNet = ipAddress + "/" + mask;
        }
        // console.log(mask, ipNet);
        axios.post('/acl', {
            pattern: 1,
            ipAddress: ipNet
        }).then(
            ({ data }) => {
                console.log(data)
                if (data.code === 200) {
                    message.success(t('acl.modal.success'));
                    setIpAddress("")
                    getAclList();
                } else {
                    message.error(t('acl.modal.fail'));
                }
                setVisible(false);
                setConfirmLoading(false);
            }, 
            err => {
                message.error(err);
                setVisible(false);
                setConfirmLoading(false);
            }
        );
    }

    function handleCancel() {
        setVisible(false);
    }

    return (
        <Modal
            title={t('acl.insert')}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 28 }}
            >
                <Form.Item>
                    <Radio.Group value={kind} onChange={(e) => setKind(e.target.value)}>
                        <Radio value={1}>IPv4</Radio>
                        <Radio value={2}>{t('acl.modal.cidr')}</Radio>
                        <Radio value={3} disabled>IPv6</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label={t('acl.ipAddress')}
                >
                    <Input value={ipAddress} onChange={(e) => setIpAddress(e.target.value)}/>
                </Form.Item>

                <Form.Item
                    label={t('acl.modal.mask')}
                    hidden={kind == 1}
                >
                    <Input value={mask} onChange={(e) => setMask(e.target.value)}/>
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default AccessControlInsertModal;