'use client';

import { useRef, useState, useEffect } from 'react';

export default function CameraCapture() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);

    // Запуск камеры при монтировании компонента
    useEffect(() => {
        async function setupCamera() {
            try {
                const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err: unknown) {
                setError('Не удалось получить доступ к камере: ' + (err instanceof Error ? err.message : String(err)));
            }
        }
        setupCamera();

        // Очистка при размонтировании
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach((track: MediaStreamTrack) => track.stop());
            }
        };
    }, []);

    // Сделать снимок
    const takePhoto = (): void => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const photoData: string = canvas.toDataURL('image/jpeg');
        setPhoto(photoData);
    };

    // Отправить фото на API
    const sendPhoto = async (): Promise<void> => {
        if (!photo) return;

        try {
            const response: Response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: photo }),
            });

            if (response.ok) {
                alert('Фото успешно отправлено!');
                setPhoto(null); // Сброс после отправки
            } else {
                throw new Error('Ошибка при отправке');
            }
        } catch (err: unknown) {
            setError('Ошибка отправки: ' + (err instanceof Error ? err.message : String(err)));
        }
    };

    return (
        <div style={{ maxWidth: '100vw', padding: '20px', textAlign: 'center' }}>
            <h1>Сделать фото</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }}
            />

            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={takePhoto}
                    style={{
                        padding: '10px 20px',
                        margin: '0 10px',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Сделать снимок
                </button>
            </div>

            {photo && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Сделанное фото:</h2>
                    <img
                        src={photo}
                        alt="Снимок"
                        style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }}
                    />
                    <button
                        onClick={sendPhoto}
                        style={{
                            padding: '10px 20px',
                            margin: '10px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Отправить
                    </button>
                    <button
                        onClick={() => setPhoto(null)}
                        style={{
                            padding: '10px 20px',
                            margin: '10px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Отменить
                    </button>
                </div>
            )}
        </div>
    );
}