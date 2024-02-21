import { useState, useEffect } from 'react';

function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

    const handleResize = () => {
        setIsDesktop(window.innerWidth > 1024);
    };

    useEffect(() => {
        // 添加事件监听器，以在窗口大小变化时更新状态
        window.addEventListener('resize', handleResize);

        // 组件卸载时清除事件监听器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isDesktop;
}

export default useIsDesktop;
