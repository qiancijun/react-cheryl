import React from 'react'
import "./index.scss"
import { Collapse } from 'antd';
import axios from 'axios';

import SetRateModal from '../../components/Modals/SetRateModal'

const { Panel } = Collapse;

export default function Rate() {
    let methods = [];
    const [panels, setPanels] = React.useState(new Array());
    const setRateModal = React.useRef();
    React.useEffect(() => {
        getMethods();
        return () => {

        }
    }, []);

    function getMethods() {
        axios.get('/methods').then(
            ({ data }) => {
                methods = data;
                createCollapseElement();
            },
            err => console.log(err)
        );
    }

    function createCollapseElement() {
        let p = [];
        for (let i = 0; i < methods.length; i++) {
            const { prefix, methodsPath } = methods[i];
            let methodsElement = [];
            for (let j = 0; j < methodsPath.length; j++) {
                let methodDom = (
                    <div className='method' key={methodsPath[j]} onClick={() => {setRateModal.current.showModal(prefix, methodsPath[j])}}>{methodsPath[j]}</div>
                )
                methodsElement.push(methodDom);
            }
            let panelDom = (
                <Panel header={prefix} key={i}>
                    {methodsElement}
                </Panel>
            )
            p.push(panelDom);
        }
        setPanels(p);
    }

    return (
        <div className='rate'>
            <Collapse>
                {panels}
            </Collapse>
            <SetRateModal ref={setRateModal}/>
        </div>
    )
}
