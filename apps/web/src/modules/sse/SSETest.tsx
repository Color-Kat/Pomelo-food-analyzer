'use client';
import React, {FC, useEffect} from 'react';


export const SseTest: FC = ({}) => {
    useEffect(() => {
        const es = new EventSource("api/scans/cm8yplg2f0000pfj0tcjvhx94/status-updates");
        es.onopen = () => console.log(">>> Connection opened!");
        es.onerror = (e) => console.log("ERROR!", e);
        es.onmessage = (e) => {
            console.log(">>>", e.data);
        };
        return () => es.close();
    }, []);

    return (
        <div className="">
            SseTest
        </div>
    );
}