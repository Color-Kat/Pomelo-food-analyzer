import Image from 'next/image';
import CameraCapture from '@/modules/camera/Camera';

export default function Home() {
    return (
        <div>
            <h1>Pomelo - анализ состава продуктов</h1>
            <CameraCapture />
        </div>
    );
}
