import React from 'react'
import './index.scss'
import { Button, Space, Table, Popconfirm, message } from 'antd'
import { useTranslation } from 'react-i18next'
import axios from 'axios';
// 组件
import AccessControlInsertModal from '../../components/Modals/AccessControlInsertModal';
import AccessControlDeleteModal from '../../components/Modals/AccessContorlDeleteModal';

const { Column } = Table;

export default function AccessList() {
    const [acl, setAclList] = React.useState([]);
    const insertModal = React.useRef(null);
    const deleteModal = React.useRef(null);
    const { t } = useTranslation();

    React.useEffect(() => {
        getAclList();
        return () => {

        }
    }, []);

    function getAclList() {
        axios.get('/getAcl').then(
            ({ data }) => {
                if (data.code === 200) {
                    const { list } = data.data;
                    let aclList = [];
                    for (let idx in list) {
                        aclList.push({
                            key: idx,
                            ipAddress: list[idx]
                        })
                    }
                    setAclList(aclList)
                }
            },
            err => console.log(err)
        );
    }

    const confirm = (val) => {
        const { ipAddress } = val;
        axios.post('/acl', {
            pattern: 0,
            ipAddress,
        }).then(
            ({ data }) => {
                if (data.code === 200) {
                    message.success(t('acl.handle.success'));
                    getAclList();
                } else {
                    message.error(t('acl.handle.error') + data.msg)
                }
            },
            err => console.log(err)
        );
    }

    return (
        <div className='accessList'>
            <div className="handle-bar">
                <Button type="primary" onClick={() => insertModal.current.showModal()}>{t('acl.insert')}</Button>
                <Button type="danger" onClick={() => deleteModal.current.showModal()}>{t('acl.delete')}</Button>
            </div>
            <Table dataSource={acl}>
                <Column title="#" dataIndex="key" key="key" />
                <Column title={t('acl.ipAddress')} dataIndex="ipAddress" key="key" />
                <Column
                    title={t('acl.action')}
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Popconfirm title={t('acl.confirm')} okText="Yes" cancelText="No" onConfirm={() => confirm(record)}>
                                <a>{t('acl.delete')}</a>
                            </Popconfirm>
                        </Space>
                    )}
                />
            </Table>
            <AccessControlInsertModal ref={insertModal} getAclList={getAclList}/>
            <AccessControlDeleteModal ref={deleteModal} getAclList={getAclList}/>
        </div>
    )
}
