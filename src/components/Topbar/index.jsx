import React from 'react'
import "./index.scss"
import { useTranslation } from 'react-i18next'
import { Select } from 'antd';

import logo from '../../assets/imgs/Cheryl.jpg'
const { Option } = Select;

export default function Topbar() {
    const { t, i18n } = useTranslation()
    React.useEffect(() => {
        // console.log(i18n);
        return () => {

        }
    }, []);
    function handleChange(val) {
        console.log(val);
        i18n.changeLanguage(val);
    }

    return (
        <div className='topbar'>
            <div className='lang'>
                <span className="language">{t('language')}</span>
                <Select defaultValue={i18n.language} style={{ width: 120 }} onChange={handleChange}>
                    <Option value="zh">中文</Option>
                    <Option value="en">English</Option>
                </Select>
            </div>
            <img src={logo} alt="" className='logo' />

        </div>
    )
}

