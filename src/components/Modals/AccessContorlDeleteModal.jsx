import React, { forwardRef, useImperativeHandle } from 'react'
import { Modal, Radio, Form, Input, Button, Checkbox } from 'antd'
import axios from 'axios';
import { message } from 'antd';
import { useTranslation } from 'react-i18next'

const AccessControlDeleteModal = forwardRef((props, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [ipAddress, setIpAddress] = React.useState("");
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
        axios.post('/acl', {
            pattern: 0,
            ipAddress
        }).then(
            ({ data }) => {
                if (data.code === 200) {
                    message.success(t('acl.modal.success'));
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
            title={t('acl.delete')}
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
                <Form.Item
                    label={t('acl.ipAddress')}
                >
                    <Input value={ipAddress} onChange={(e) => setIpAddress(e.target.value)}/>
                </Form.Item>
            </Form>
        </Modal>
    )
})

export default AccessControlDeleteModal;