import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './layout/layout';
import { antdConfig } from './config/config';
import Dashboard from './pages/dashboard';

function App() {
    return (
        <ConfigProvider theme={antdConfig}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    {/* <Route path="/login" element={<Login />} /> */}
                </Routes>
            </BrowserRouter>
        </ConfigProvider>
    );
}

export default App;
