import React, { PureComponent } from 'react'
import { Modal } from 'antd';

export default class ModalExample extends PureComponent {
    // const [visible, setVisible] = React.useState(false);
    // const [confirmLoading, setConfirmLoading] = React.useState(false);
    // const [modalText, setModalText] = React.useState('Content of the modal');

    state = {
        visible: false,
        confirmLoading: false,
        modalText: "Example Modal"
    }
    setVisible = (visible) => {
        this.setState({ visible });
    }

    setConfirmLoading = (confirmLoading) => {
        this.setState({ confirmLoading });
    }

    showModal = () => {
        this.setVisible(true);
    }

    handleOk = () => {
        this.setConfirmLoading(true);
        setTimeout(() => {
            this.setVisible(false);
            this.setConfirmLoading(false);
        }, 2000);
    }

    handleCancel = () => {
        this.setVisible(false);
    }

    render() {
        const {visible, confirmLoading, modalText} = this.state
        return (
            <Modal
                title="Title"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        )
    }
}
