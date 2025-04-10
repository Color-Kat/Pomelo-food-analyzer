'use client';

import React, {useState, ChangeEvent, FC, useEffect} from 'react';
import {ScanStatusChanged} from "@app/contracts/scan/scan.status-changed";

export const FileUploadTest: FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');

    const [scanId, setScanId] = React.useState('');
    const [scanStatus, setScanStatus] = React.useState('');

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setMessage('');
        }
    };

    const handleUpload = async () => {
        setScanStatus('');
        if (!file) {
            setMessage('Пожалуйста, выберите фото');
            return;
        }

        const formData = new FormData();
        formData.append('photo', file);
        formData.append('userId', 'admin');
        formData.append('type', 'food');

        try {
            const response = await fetch('http://localhost:3000/scans', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();


            setMessage('Фото успешно отправлено!');
            // setFile(null);
            // setPreview(null);

            setScanId(result.scan.id);
        } catch (error) {
            setMessage(`Ошибка: ${(error as Error).message}`);
        }
    };

    useEffect(() => {
        if (!scanId) return;

        const es = new EventSource(`http://localhost:3000/scans/${scanId}/status-updates`);
        es.onopen = () => console.log('>>> Connection opened!');
        es.onerror = (e) => {
            console.log('ERROR!', e);
            setScanId('');
        };
        es.onmessage = (e: MessageEvent) => {
            const data: ScanStatusChanged.Payload = JSON.parse(e.data);
            console.log(">>>", data);
            setScanStatus(data.status);
        };

        return () => es.close();
    }, [scanId]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h1>Загрузка фото</h1>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ margin: '10px 0' }}
            />

            {preview && (
                <div style={{ margin: '20px 0' }}>
                    <h2>Предпросмотр</h2>
                    <img
                        src={preview}
                        alt="Предпросмотр фото"
                        style={{ width: '100%', maxWidth: '640px', border: '1px solid black' }}
                    />
                </div>
            )}

            <button
                onClick={handleUpload}
                style={{ padding: '10px 20px' }}
            >
                Отправить фото
            </button>

            {message && (
                <p style={{ color: message.includes('ошибка') ? 'red' : 'green', marginTop: '10px' }}>
                    {message}
                </p>
            )}

            <br/>
            <h2>Статус сканирования: </h2>
            {scanStatus
                ? <div>{scanStatus}</div>
                : <div>Не начато</div>
            }
        </div>
    );
}