import React, { forwardRef, useImperativeHandle } from 'react'
import { Modal, Form, Input, Button, Select, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
const { Option } = Select;

const AddProxyModal = forwardRef((props, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [pattern, setPattern] = React.useState("");
    const [proxy_pass, setPass] = React.useState([]);
    const [balance_mode, setBalance] = React.useState("round-robin")
    const { t } = useTranslation();
    useImperativeHandle(ref, () => ({
        showModal
    }));

    React.useEffect(() => {
        return () => {

        }
    }, [])

    const showModal = () => {
        setVisible(true);
    }

    const handleChange = (val) => {
        setBalance(val);
    }

    const handleOk = () => {
        setConfirmLoading(true);
        axios.post('/addProxy', {
            pattern,
            proxyPass: proxy_pass,
            balanceMode: balance_mode,
        }).then(
            ({ data }) => {
                if (data.code === 200) {
                    message.success(t('index.modal.success'));
                    const { getProxyInfo } = props;
                    getProxyInfo();
                } else {
                    message.error(data.msg)
                }
                setVisible(false);
                setConfirmLoading(false);
            },
            err => {
                setVisible(false);
                setConfirmLoading(false);
                console.log(err)
            }
        );
    }

    const handleCancel = () => {
        setVisible(false);
    }
    return (
        <Modal
            title={t('index.modal.add_proxy')}
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
                    label={t('index.modal.pattern')}
                >
                    <Input value={pattern} onChange={(e) => setPattern(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label={t('index.modal.balance')}
                >
                    <Select defaultValue="round-robin" style={{ width: 180 }} onChange={handleChange}>
                        <Option value="round-robin">{t('index.modal.round-robin')}</Option>
                    </Select>
                </Form.Item>
                <Form.List
                    name="names"
                >
                    {(fields, { add, remove }, { errors }) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={t('index.modal.proxy_address')}
                                    required={false}
                                    key={field.key}
                                >
                                    {/* <Form.Item>
                                <Input placeholder="Proxy address"/>
                            </Form.Item> */}
                                    <Input placeholder={t('index.modal.hint')} style={{ width: 250 }} onChange={(e) => {
                                        let proxyAddress = proxy_pass;
                                        proxyAddress[index] = e.target.value;
                                        setPass(proxyAddress);
                                    }} />
                                    <MinusCircleOutlined
                                        style={{ marginLeft: 10 }}
                                        className="dynamic-delete-button"
                                        onClick={() => {
                                            remove(field.name)
                                            let pass = proxy_pass;
                                            pass.splice(index, 1);
                                            setPass(pass);
                                        }}
                                    />
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                        let pass = proxy_pass;
                                        pass.push("");
                                        setPass(pass);
                                    }}
                                    icon={<PlusOutlined />}
                                >
                                    {t('index.modal.add')}
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    )
});

export default AddProxyModal