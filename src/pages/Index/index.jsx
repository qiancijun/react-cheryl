import axios from 'axios';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Spin, Descriptions, Badge, Tree, Dropdown } from 'antd';
import './index.scss'
// 图片
import link from "../../assets/imgs/link.svg"
import offline from "../../assets/imgs/offline.svg"
import add from "../../assets/imgs/add.svg"
//组件
import AddProxyModal from '../../components/Modals/AddProxyModal';
import BubbleDialog from '../../components/BubbleDialog';

export default function Index() {

    const [loading, setLoading] = React.useState(true);
    const [info, setInfo] = React.useState({
        name: "",
        proxyPort: "",
        raftAddress: "",
        isLeader: false,
    });
    const [proxy, setProxy] = React.useState();

    const { t } = useTranslation();
    const addProxyModal = React.useRef();
    const bubbleDialog = React.useRef();

    React.useEffect(() => {
        getNodeInfo();
        getProxyInfo();
        return () => {

        }
    }, []);

    
    const getNodeInfo = () => {
        axios.get('/info').then(
            ({ data }) => {
                setInfo(data.data.info);
                setLoading(false);
            },
            err => { console.log(err) }
        );
    }

    const getProxyInfo = () => {
        axios.get('/proxy').then(
            ({ data }) => {
                console.log(data.data.data);
                const proxyInfo = data.data.data;
                wrapProxyInfo(proxyInfo);

            },
            err => { console.log(err) }
        );
    }

    function wrapProxyInfo(data) {
        let treeData = [];
        for (let key in data) {
            const { hosts, balancerMode } = data[key];
            let tmp = {
                title: key + "---" + balancerMode,
                key: key,
                isLeaf: false,
                pattern: key,
                lb: balancerMode,
                host: "",
                children: [],
            };
            for (let i = 0; i < hosts.length; i++) {
                tmp.children.push({
                    title: hosts[i]['host'],
                    key: key + '/' + hosts[i]['host'],
                    isLeaf: true,
                    pattern: key,
                    host: hosts[i]['host'],
                    icon: hosts[i]['alive'] ? (<img src={link}></img>) : (<img src={offline}></img>)
                });
            }
            treeData.push(tmp);
        }
        setProxy(treeData);
    }

    function addProxy() {
        addProxyModal.current.showModal();
    }

    const proxyClick = (e) => {
        // console.log(e)
        // console.log(bubbleDialog.current)
        bubbleDialog.current.showModal(e.event.clientX, e.event.clientY, e.node);
    }

    return (
        <div className='index' onClick={() => bubbleDialog.current.close()}>
            <div className="loading" hidden={!loading}>
                <Spin size="large" spinning={loading} tip={t("other.loading")} />
            </div>
            <Descriptions title={t("index.desc_title")} bordered column={2}>
                <Descriptions.Item label={t("index.desc_node_name")}>{info.name}</Descriptions.Item>
                <Descriptions.Item label={t("index.desc_proxy_port")}>{info.proxyPort}</Descriptions.Item>
                <Descriptions.Item label={t("index.desc_raft_address")}>{info.raftAddress}</Descriptions.Item>
                <Descriptions.Item label={t("index.desc_is_leader")}>{info.isLeader ? "Leader" : "Follower"}</Descriptions.Item>
            </Descriptions>
            <div className='proxy' hidden={loading}>
                <div className='title'>{t('index.proxy_title')}
                    <img className='add' src={add} alt="" onClick={addProxy} />
                </div>
                <Tree
                    showIcon
                    className='tree'
                    onRightClick={proxyClick}
                    treeData={proxy} />
            </div>
            <AddProxyModal ref={addProxyModal} getProxyInfo={getProxyInfo} />
            <BubbleDialog ref={bubbleDialog} getProxyInfo={getProxyInfo}/>
        </div>
    )
}
