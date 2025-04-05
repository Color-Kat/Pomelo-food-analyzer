import CameraCapture from '@/modules/camera/Camera';
import {SseTest} from "@/modules/sse/SSETest";
import {FileUploadTest} from "@/modules/fileUpload/FileUploadTest";

export default function Home() {
    return (
        <div>
            <h1>Pomelo - анализ состава продуктов</h1>
            <CameraCapture />
            <SseTest />

            <hr/>

            <FileUploadTest />

        </div>
    );
}
