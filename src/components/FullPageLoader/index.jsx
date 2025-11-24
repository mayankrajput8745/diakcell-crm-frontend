import { Progress, Typography } from "antd";
import { RiBox3Line } from "@remixicon/react";
import { useEffect, useState } from "react";
import moment from "moment";

// Constants for branding
import { COMPANY_NAME } from "../../utils/constants";

const { Text } = Typography;

const FullPageLoader = ({ message = "Processing..." }) => {
    const [progress, setProgress] = useState(0);

    const currentYear = moment().format('YYYY');
    const appVersion = import.meta.env.VITE_APP_VERSION || '1.0.0';

    useEffect(() => {
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90; // Stop at 90% until request completes
                }
                return prev + 15;
            });
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(4px)',
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999
        }}>
            {/* Logo Icon */}
            <div style={{
                background: '#3B82F6',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
            }}>
                <RiBox3Line size={40} color="white" />
            </div>

            {/* Loading Text and Progress Bar Container */}
            <div style={{ 
                width: '100%',
                maxWidth: '320px',
                textAlign: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                }}>
                    <Text style={{ 
                        fontSize: '14px',
                        color: '#374151',
                        fontWeight: 500
                    }}>
                        {message}
                    </Text>
                    <Text style={{ 
                        fontSize: '14px',
                        color: '#6B7280',
                        fontWeight: 600
                    }}>
                        {progress}%
                    </Text>
                </div>

                {/* Progress Bar */}
                <Progress 
                    percent={progress} 
                    strokeColor="#3B82F6"
                    showInfo={false}
                    strokeWidth={8}
                    trailColor="#E5E7EB"
                />
            </div>

            {/* Footer */}
            <div style={{
                position: 'absolute',
                bottom: '24px',
                textAlign: 'center'
            }}>
                <Text style={{ 
                    fontSize: '12px',
                    color: '#9CA3AF'
                }}>
                    © {currentYear} {COMPANY_NAME}. Version {appVersion}
                </Text>
            </div>
        </div>
    );
};

export default FullPageLoader;