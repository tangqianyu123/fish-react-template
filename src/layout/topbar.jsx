import React, { useContext, useState } from 'react';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { LayoutContext } from './layoutContext';
import { useNavigate } from 'react-router-dom';

export default function AppTopbar() {
    const navigate = useNavigate();
    const { onMenuToggle } = useContext(LayoutContext);

    const handleLogoutClick = () => {
        // logout();
        navigate('/login');
    };

    return (
        <div className="flex mb-8 justify-between items-center">
            <Button className="bg-transparent " size="large" shape="circle" icon={<MenuOutlined />} onClick={onMenuToggle}></Button>
            <div className="flex items-center">
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'logout',
                                label: <div onClick={handleLogoutClick}>Logout</div>
                            }
                        ]
                    }}
                >
                    <Avatar className="cursor-pointer" size="large" src="/images/avatar.jpg" />
                </Dropdown>
            </div>
        </div>
    );
}
