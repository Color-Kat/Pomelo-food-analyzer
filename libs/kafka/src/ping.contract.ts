export namespace PingContract {
    export const topic = ".ping.request";

    export class Request {
        serviceName: string;
        startTime: number;
    }

    export class Response {
        status: string | number;
        service: string;
        requestTime: string;
    }
}
