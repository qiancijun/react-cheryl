import { message } from 'antd';
import axios from 'axios';
import React, { forwardRef, useImperativeHandle } from 'react'
import './index.scss'
import { useTranslation } from 'react-i18next'

import AddHostModal from '../Modals/AddHostModal';
import ChangeLbModeModal from '../Modals/ChangeLbModeModal';

const BubbleDialog = forwardRef((props, ref) => {

  const [visible, setVisible] = React.useState(false);
  const [isLeaf, setIsLeaf] = React.useState(false);
  const [pattern, setPattern] = React.useState("");
  const [host, setHost] = React.useState("");
  const [node, setNode] = React.useState({});
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);

  const dialog = React.useRef();
  const addHostRef = React.useRef();
  const changeLbModeModal = React.useRef();

  const { getProxyInfo } = props;

  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    showModal,
    close
  }))

  const showModal = (x, y, node) => {
    const { isLeaf, pattern, host} = node;
    setNode(node);
    setVisible(true);
    setIsLeaf(isLeaf);
    setPattern(pattern)
    setHost(host);
    setX(x)
    setY(y)
  }

  React.useEffect(() => {
    return () => {

    }
  }, []);

  const deleteProxy = () => {
    axios.post('/removeProxy', {
      pattern,
    }).then(
      ({ data }) => {
        if (data.code === 200) {
          message.success(t('other.success'))
          getProxyInfo();
        } else {
          message.error(data.msg)
        }
        setVisible(false);
      },
      err => {
        console.log(err);
        setVisible(false);
      }
    );
  }

  const deleteHost = () => {
    axios.post('/removeHost', {
      pattern,
      host
    }).then(
      ({ data }) => {
        if (data.code === 200) {
          message.success(t('other.success'))
          getProxyInfo();
        } else {
          message.error(data.msg)
        }
        setVisible(false);
      },
      err => {
        console.log(err);
        setVisible(false);
      }
    )
  }

  const changeLoadBalance = () => {
    changeLbModeModal.current.showModal(node);
  }

  const close = () => {
    setVisible(false);
  }

  return (
    <div className='bubbleDialog' hidden={!visible} ref={dialog} style={{left: x, top: y}}>
      <div className="delete-proxy" hidden={isLeaf} onClick={deleteProxy}>{t('bubble.delete_proxy')}</div>
      <div className="add-host" hidden={isLeaf} onClick={() => {addHostRef.current.showModal(pattern)}}>{t('bubble.add_host')}</div>
      <div className="change-lb" hidden={isLeaf} onClick={changeLoadBalance}>{t('bubble.load_balance')}</div>
      <div className="delete-host" hidden={!isLeaf} onClick={deleteHost}>{t('bubble.delete_host')}</div>
      <div className="delete-host" onClick={() => setVisible(false)}>{t('bubble.close')}</div>
      <AddHostModal ref={addHostRef} close={close} getProxyInfo={props.getProxyInfo}/>
      <ChangeLbModeModal ref={changeLbModeModal}/>
    </div>
  )
});

export default BubbleDialog