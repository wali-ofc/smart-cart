import React, { useEffect } from 'react';
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Admin Dashboard || SmartCart",
  description: "SmartCart Admin",
};

export default function AdminIframe() {
    useEffect(() => {
        // Hide the main wrapper padding/margin if any
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            <MetaComponent meta={metadata} />
            <iframe 
                src="/admin-build/index.html" 
                style={{ 
                    width: '100vw', 
                    height: '100vh', 
                    border: 'none', 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    zIndex: 999999 
                }} 
                title="Admin Dashboard"
            />
        </>
    );
}
