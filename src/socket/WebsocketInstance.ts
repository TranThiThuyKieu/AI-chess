import type { WsReceiveMessage, WsReceiveMsgPayloadMap } from "@/socket/types/WebSocketMessageReceive";
import type { WsSendMsgPayloadMap } from "@/socket/types/WebsocketMessageSend";
import { WebSocketEvent } from "@/socket/types/WebSoketMessage";
import {
    MOCK_CHAT_PEOPLE_HISTORY,
    MOCK_ROOM_HISTORY,
    MOCK_USER_LIST
} from "@/constants/staticMockData";

/**
 * Handle WebSocket response
 * @param data Message data received from a WebSocket event
 */
type WsCallback<K extends keyof WsReceiveMsgPayloadMap> = (
    data: WsReceiveMessage<K>
) => void;

export class WebsocketInstance {
    private static instance: WebsocketInstance;
    private subscriber: Map<string, Function[]> = new Map();

    public onInitConnection?: () => void;
    public onConnectionLost?: (code: number) => void;
    public onServerError?: () => void;

    private constructor() {
        // Pure static frontend: simulated instant connection
        setTimeout(() => {
            if (this.onInitConnection) {
                this.onInitConnection();
            }
        }, 10);
    }

    public static getInstance() {
        if (!WebsocketInstance.instance) {
            WebsocketInstance.instance = new WebsocketInstance();
        }
        return WebsocketInstance.instance;
    }

    public connect(_url?: string) {
        setTimeout(() => {
            if (this.onInitConnection) {
                this.onInitConnection();
            }
        }, 10);
    }

    public send<K extends WebSocketEvent>(
        event: K,
        data: WsSendMsgPayloadMap[K]
    ) {
        // Handle client-side responses without any backend/server
        setTimeout(() => {
            switch (event) {
                case WebSocketEvent.LOGIN: {
                    const loginData = data as any;
                    this.emit(WebSocketEvent.LOGIN as any, {
                        status: "success",
                        event: WebSocketEvent.LOGIN,
                        data: { RE_LOGIN_CODE: "MOCK_RELOGIN_CODE_" + Date.now() },
                        mes: `Welcome ${loginData?.user || ""}`
                    } as any);
                    break;
                }
                case WebSocketEvent.RE_LOGIN: {
                    this.emit(WebSocketEvent.RE_LOGIN as any, {
                        status: "success",
                        event: WebSocketEvent.RE_LOGIN,
                        data: { RE_LOGIN_CODE: "MOCK_RELOGIN_CODE_" + Date.now() },
                        mes: "Relogin success"
                    } as any);
                    break;
                }
                case WebSocketEvent.REGISTER: {
                    this.emit(WebSocketEvent.REGISTER as any, {
                        status: "success",
                        event: WebSocketEvent.REGISTER,
                        data: {},
                        mes: "Register success"
                    } as any);
                    break;
                }
                case WebSocketEvent.GET_USER_LIST: {
                    this.emit(WebSocketEvent.GET_USER_LIST as any, {
                        status: "success",
                        event: WebSocketEvent.GET_USER_LIST,
                        data: MOCK_USER_LIST,
                        mes: "Success"
                    } as any);
                    break;
                }
                case WebSocketEvent.GET_PEOPLE_CHAT_MES: {
                    const req = data as any;
                    const history = MOCK_CHAT_PEOPLE_HISTORY[req?.name] || [];
                    this.emit(WebSocketEvent.GET_PEOPLE_CHAT_MES as any, {
                        status: "success",
                        event: WebSocketEvent.GET_PEOPLE_CHAT_MES,
                        data: history,
                        mes: "Success"
                    } as any);
                    break;
                }
                case WebSocketEvent.GET_ROOM_CHAT_MES: {
                    const req = data as any;
                    const room = MOCK_ROOM_HISTORY[req?.name] || {
                        id: Date.now(),
                        name: req?.name,
                        own: "longchat_user",
                        userList: [{ id: 1, name: "longchat_user" }],
                        chatData: []
                    };
                    this.emit(WebSocketEvent.GET_ROOM_CHAT_MES as any, {
                        status: "success",
                        event: WebSocketEvent.GET_ROOM_CHAT_MES,
                        data: room,
                        mes: "Success"
                    } as any);
                    break;
                }
                case WebSocketEvent.CREATE_ROOM:
                case WebSocketEvent.JOIN_ROOM: {
                    const roomName = (data as any)?.name || "Nhóm mới";
                    const room = MOCK_ROOM_HISTORY[roomName] || {
                        id: Date.now(),
                        name: roomName,
                        own: "longchat_user",
                        userList: [{ id: 1, name: "longchat_user" }],
                        chatData: []
                    };
                    this.emit(event as any, {
                        status: "success",
                        event: event,
                        data: room,
                        mes: "Success"
                    } as any);
                    break;
                }
                default:
                    break;
            }
        }, 20);
    }

    /**
     * Subscribe to an event from a component or from a middleware
     */
    public subscribe<K extends WebSocketEvent>(
        event: K,
        callback: WsCallback<K>
    ) {
        if (!this.subscriber.has(event)) {
            this.subscriber.set(event, []);
        }
        this.subscriber.get(event)?.push(callback);

        return () => this.unsubscribe(event, callback);
    }

    /**
     * Unsubscribe an event from subscriber
     */
    private unsubscribe<K extends WebSocketEvent>(
        event: K,
        callback: WsCallback<K>
    ) {
        const listener = this.subscriber.get(event);
        if (listener) {
            this.subscriber.set(event, listener.filter(cb => cb !== callback));
        }
    }

    // Send data to subscribers
    public emit<K extends WebSocketEvent>(
        event: K,
        data: WsReceiveMessage<K>
    ) {
        const listener = this.subscriber.get(event);
        if (listener) {
            listener.forEach(cb => cb(data));
        }
    }

    get getSocket() {
        return {
            readyState: 1 // WebSocket.OPEN
        } as unknown as WebSocket;
    }
}