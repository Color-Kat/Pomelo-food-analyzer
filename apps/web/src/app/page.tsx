import CameraCapture from '@/modules/camera/Camera';
import {SseTest} from "@/modules/sse/SSETest";

export default function Home() {
    return (
        <div>
            <h1>Pomelo - анализ состава продуктов</h1>
            <CameraCapture />
            <SseTest />

        </div>
    );
}
