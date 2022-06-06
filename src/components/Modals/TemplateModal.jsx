import React from 'react'
import { Modal } from 'antd'

export default function TemplateModal() {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    React.useEffect(() => {
        return () => {

        }
    }, [])

    function showModal() {
        setVisible(true);
    }

    function handleOk() {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        })
    }

    function handleCancel() {
        setVisible(false);
    }

    return (
        <Modal
            title="Title"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
            
        </Modal>
    )
}
