/**
 * useDeviceFingerprint Hook
 * SMK Marhas Admin Dashboard
 * 
 * Hook untuk deteksi dan generate fingerprint device
 */

'use client';

import { useState, useEffect } from 'react';

interface DeviceInfo {
    fingerprint: string;
    name: string;
    browser: string;
    os: string;
    screenResolution: string;
    timezone: string;
    language: string;
}

export function useDeviceFingerprint(): DeviceInfo | null {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);

    useEffect(() => {
        const generateFingerprint = async () => {
            const info = await getDeviceInfo();
            setDeviceInfo(info);
        };

        generateFingerprint();
    }, []);

    return deviceInfo;
}

async function getDeviceInfo(): Promise<DeviceInfo> {
    const userAgent = navigator.userAgent;

    // Parse browser
    const browser = getBrowser(userAgent);

    // Parse OS
    const os = getOS(userAgent);

    // Generate device name
    const name = `${browser} on ${os}`;

    // Screen resolution
    const screenResolution = `${window.screen.width}x${window.screen.height}`;

    // Timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Language
    const language = navigator.language;

    // Generate fingerprint from combined data
    const fingerprintData = `${userAgent}|${screenResolution}|${timezone}|${language}`;
    const fingerprint = await hashString(fingerprintData);

    return {
        fingerprint,
        name,
        browser,
        os,
        screenResolution,
        timezone,
        language,
    };
}

function getBrowser(userAgent: string): string {
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('SamsungBrowser')) return 'Samsung Browser';
    if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
    if (userAgent.includes('Trident')) return 'Internet Explorer';
    if (userAgent.includes('Edge')) return 'Edge Legacy';
    if (userAgent.includes('Edg')) return 'Edge';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Safari')) return 'Safari';
    return 'Unknown Browser';
}

function getOS(userAgent: string): string {
    if (userAgent.includes('Win')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
    return 'Unknown OS';
}

async function hashString(str: string): Promise<string> {
    if (typeof crypto !== 'undefined' && crypto.subtle) {
        const msgBuffer = new TextEncoder().encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
    }

    // Fallback simple hash
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(32, '0').slice(0, 32);
}

export default useDeviceFingerprint;
