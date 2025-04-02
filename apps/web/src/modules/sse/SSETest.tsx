'use client';
import {ScanStatusChanged} from "@shared/contracts/src/scan/scan.status-changed";
import React, {FC, useEffect} from 'react';

export const SseTest: FC = ({}) => {
    const [scanId, setScanId] = React.useState('');
    const [scanStatus, setScanStatus] = React.useState('');
    const createScan = async () => {
        const response = await fetch('http://localhost:3000/scans', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                type: 'food',
                userId: 'admin'
            })
        });
        const result = await response.json();

        console.log(result);

        setScanId(result.scan.id);
    }

    useEffect(() => {
        if (!scanId) return;

        const es = new EventSource(`http://localhost:3000/scans/${scanId}/status-updates`);
        es.onopen = () => console.log(">>> Connection opened!");
        es.onerror = (e) => {
            console.log("ERROR!", e);
            setScanId("");
        };
        es.onmessage = (e: MessageEvent) => {
            const data: ScanStatusChanged.Response = JSON.parse(e.data);
            console.log(">>>", data);
            setScanStatus(data.status);
        };

        return () => es.close();
    }, [scanId]);

    return (
        <div className="">
            <h1>SseTest</h1>
            <button className="bg-green-500 text-white" onClick={createScan}>Create new scan</button>
            <h2>Scan status: </h2>
            <div>{scanStatus}</div>
        </div>
    );
}