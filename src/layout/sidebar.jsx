import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Drawer, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutContext } from './layoutContext';
import { appConfig } from '../config/config';
import useIsDesktop from '../hooks/useIsDesktop';

export default function AppSidebar() {
    const navigate = useNavigate();
    const isDesktop = useIsDesktop();
    const { pathname } = useLocation();
    const { menuActive, onMenuToggle } = useContext(LayoutContext);
    const menuList = [{ label: '首页', key: 'dashboard' }];
    const [selectKey, setSelctKey] = useState('');

    const handleClickMenuItem = ({ key }) => {
        setSelctKey(key);
        navigate(`/${key}`);
    };

    const checkActiveIndex = useCallback(() => {
        const paths = pathname.split('/');
        const currentPath = paths[paths.length - 1];
        setSelctKey(currentPath);
    }, [pathname]);

    useEffect(() => {
        checkActiveIndex();
    }, [checkActiveIndex]);

    return isDesktop ? (
        <div className={`fixed h-full top-0 left-0 w-72 bg-white flex flex-col transition-transform duration-300 ${!menuActive ? '-translate-x-full' : ''}`}>
            <div
                className="flex pt-10 pb-8 justify-center items-center"
                onClick={() => {
                    navigate('/');
                }}
            >
                <img className="w-14 h-14 cursor-pointer" src="/images/logo.png" alt="" />
                <span className="font-bold text-lg cursor-pointer">{appConfig.title}</span>
            </div>
            <Menu className="flex-1" mode="inline" theme="light" selectedKeys={[selectKey]} items={menuList} onClick={handleClickMenuItem} />
        </div>
    ) : (
        <Drawer placement="left" classNames={{ header: '!hidden' }} open={menuActive} width={'18rem'} onClose={onMenuToggle}>
            <div
                className="flex pb-8 justify-center items-center"
                onClick={() => {
                    navigate('/');
                }}
            >
                <img className="w-14 h-14 cursor-pointer" src="/images/logo.png" alt="" />
                <span className="font-bold text-lg cursor-pointer">{appConfig.title}</span>
            </div>
            <Menu className="flex-1" mode="inline" theme="light" selectedKeys={[selectKey]} items={menuList} onClick={handleClickMenuItem} />
        </Drawer>
    );
}
