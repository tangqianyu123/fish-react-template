import React, { useState, useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import AppSidebar from './sidebar';
import AppTopbar from './topbar';
import { LayoutContext } from './layoutContext';
import useIsDesktop from '../hooks/useIsDesktop';

export default function AppLayout() {
    const navigate = useNavigate();
    const isDesktop = useIsDesktop();
    const [menuActive, setMenuActive] = useState(isDesktop);

    const onMenuToggle = () => {
        setMenuActive(!menuActive);
    };
    const value = {
        menuActive,
        onMenuToggle
    };

    return (
        <LayoutContext.Provider value={value}>
            <div className="flex min-h-screen bg-[#eff3f8] text-[#1e293b]">
                <AppSidebar />
                <div className={`p-4 w-full duration-300 transition-[margin-left] lg:p-8 ${menuActive && isDesktop ? 'ml-72' : 'ml-0'}`}>
                    <AppTopbar />
                    <Outlet />
                </div>
            </div>
        </LayoutContext.Provider>
    );
}
