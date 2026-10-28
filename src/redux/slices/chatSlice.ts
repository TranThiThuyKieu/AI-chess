import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
    ReceiveMsgGetChatPeoplePayload, ReceiveMsgGetChatRoomPayload,
    ReceiveMsgGetUserListPayload, ReceiveMsgSendChatRoomPayload
} from "@/socket/types/WebsocketReceivePayload";
import type {
    SendMsgGetChatPayload,
    SendMsgGetUserListPayload,
    SendMsgSendChatPayload
} from "@/socket/types/WebsocketSendPayload";
import type { MessageContent } from "@/types/MessageContent";

interface ChatState {
    // Key: target user, Value: data received
    chatPeopleHistory: Record<string, ReceiveMsgGetChatPeoplePayload[]>;
    // Key: target room, Value: room info and chatData
    roomHistory: Record<string, ReceiveMsgGetChatRoomPayload>;
    // get list users that account had chatted
    userList: ReceiveMsgGetUserListPayload[];
    // currentUser that account open
    currentChatTarget: ReceiveMsgGetUserListPayload | null;
    isLoading: boolean; //check for loading data from server
    inputValue: string;
    attachmentHistory: Record<string, string[]>
    currentPageRoom: Record<string, {page: number, continue: boolean}>;
    currentViewAttachment: { state: boolean, index: number }
}

import {
    MOCK_CHAT_PEOPLE_HISTORY,
    MOCK_ROOM_HISTORY,
    MOCK_USER_LIST
} from "@/constants/staticMockData";

const initialAttachments: Record<string, string[]> = {};
Object.entries(MOCK_CHAT_PEOPLE_HISTORY).forEach(([name, msgs]) => {
    initialAttachments[name] = [];
    msgs.forEach(msg => {
        try {
            const parsed = JSON.parse(msg.mes);
            if (parsed.attachment) initialAttachments[name].push(...parsed.attachment);
        } catch (_) {}
    });
});
Object.entries(MOCK_ROOM_HISTORY).forEach(([name, room]) => {
    initialAttachments[name] = [];
    room.chatData.forEach(msg => {
        try {
            const parsed = JSON.parse(msg.mes);
            if (parsed.attachment) initialAttachments[name].push(...parsed.attachment);
        } catch (_) {}
    });
});

const initialState: ChatState = {
    chatPeopleHistory: MOCK_CHAT_PEOPLE_HISTORY,
    roomHistory: MOCK_ROOM_HISTORY,
    userList: MOCK_USER_LIST,
    currentChatTarget: MOCK_USER_LIST[1], // Trần Mai Anh
    isLoading: false,
    inputValue: "",
    attachmentHistory: initialAttachments,
    currentPageRoom: {
        "Nhóm Dự Án Web - NLU": { page: 1, continue: false },
        "CLB Lập Trình Sinh Viên": { page: 1, continue: false }
    },
    currentViewAttachment: { state: false, index: -1 }
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // request to get user list
        getUserList: (state, _action: PayloadAction<SendMsgGetUserListPayload>) => {
            state.isLoading = false;
        },
        // request to get message from chat
        getPeopleChatHistory: (state, _action: PayloadAction<SendMsgGetChatPayload>) => {
            state.isLoading = false;
        },
        // request to get room info + message in room
        getRoomChatHistory: (state, _action: PayloadAction<SendMsgGetChatPayload>) => {
            state.isLoading = false;
        },
        // request to send message to user
        sendPeopleChat: (state, action: PayloadAction<SendMsgSendChatPayload>) => {
            const { to, mes } = action.payload;
            if (!state.chatPeopleHistory[to]) {
                state.chatPeopleHistory[to] = [];
            }
            let myUsername = "longchat_user";
            try {
                const rawUser = localStorage.getItem("user");
                if (rawUser) myUsername = JSON.parse(rawUser).username;
            } catch (_) {}

            const newMsg: ReceiveMsgGetChatPeoplePayload = {
                id: Date.now(),
                name: myUsername,
                to: to,
                mes: mes,
                type: 0,
                createAt: new Date().toISOString()
            };
            state.chatPeopleHistory[to].push(newMsg);

            try {
                const parsed = JSON.parse(mes) as MessageContent;
                if (parsed.attachment && parsed.attachment.length > 0) {
                    if (!state.attachmentHistory[to]) state.attachmentHistory[to] = [];
                    state.attachmentHistory[to].push(...parsed.attachment);
                }
            } catch (_) {}

            const userIndex = state.userList.findIndex(u => u.name.toLowerCase() === to.toLowerCase());
            if (userIndex !== -1) {
                const updated = { ...state.userList[userIndex], actionTime: newMsg.createAt };
                state.userList = [updated, ...state.userList.filter((_, idx) => idx !== userIndex)];
            } else {
                state.userList = [{ name: to, type: 0, actionTime: newMsg.createAt }, ...state.userList];
            }
            state.isLoading = false;
        },

        // update store
        //get user list account had chatted
        setUserList: (state, action: PayloadAction<ReceiveMsgGetUserListPayload[]>) => {
            action.payload.forEach(msg => {
                if (msg.actionTime && !msg.actionTime.includes('T')) {
                    msg.actionTime = msg.actionTime.replace(" ", "T") + "Z";
                }
            });
            state.userList = action.payload;
            const sortedList = [...action.payload].sort((a, b) => {
                return new Date(b.actionTime || 0).getTime() - new Date(a.actionTime || 0).getTime();
            });
            state.userList = sortedList;
            state.isLoading = false;
            sortedList.forEach(ele => {
                if (!state.attachmentHistory[ele.name]) {
                    state.attachmentHistory[ele.name] = [];
                }
            });
        },

        // Choose one to read chat history and chat
        setCurrentChatTarget: (state, action: PayloadAction<ReceiveMsgGetUserListPayload>) => {
            state.currentChatTarget = action.payload;
        },
        setPeopleChatHistory: (state, action: PayloadAction<{ targetName: string, messages: ReceiveMsgGetChatPeoplePayload[] }>) => {
            const { targetName, messages } = action.payload;
            messages.forEach(msg => {
                if (msg.createAt && !msg.createAt.includes('T')) {
                    msg.createAt = msg.createAt.replace(" ", "T") + "Z";
                }
            });
            const reverseMessages = [...messages].reverse();
            state.chatPeopleHistory[targetName] = reverseMessages
            //Reset to avoid duplicate
            state.attachmentHistory[targetName] = []
            reverseMessages.forEach((msg) => {
                try {
                    if (!msg.mes.startsWith("{")) return
                    const parsedMessage = JSON.parse(msg.mes) as MessageContent
                    if (parsedMessage.attachment) {
                        state.attachmentHistory[targetName].push(...parsedMessage.attachment)
                    }
                }
                catch (_) { }
            })
            state.isLoading = false;
        },
        updateRoomHistory: (state, action: PayloadAction<ReceiveMsgGetChatRoomPayload>) => {
            const payload = action.payload
            const target = payload.name

            const processedChatData = [...payload.chatData].reverse().map((msg) => ({
                ...msg,
                createAt: msg.createAt && !msg.createAt.includes("T")
                    ? msg.createAt.replace(" ", "T") + "Z"
                    : msg.createAt
            }))

            const newAttachments = new Set<string>()
            processedChatData.forEach((msg) => {
                try {
                    if (!msg.mes.startsWith("{")) return
                    const parsedMessage = JSON.parse(msg.mes) as MessageContent
                    parsedMessage.attachment.forEach(url => newAttachments.add(url));
                }
                catch (_) { }
            })
            state.roomHistory[target] = {
                ...payload,
                chatData: processedChatData
            }
            state.attachmentHistory[target] = Array.from(newAttachments)
            state.isLoading = false;
            
            state.currentPageRoom[target] = {
                page: 1,
                continue: true,
            }
            
        },

        receiveNewPeopleMessage: (state, action: PayloadAction<{ targetName: string, message: ReceiveMsgGetChatPeoplePayload }>) => {
            const { targetName, message } = action.payload;
            message.createAt = message.createAt.replace(" ", "T") + "Z"
            if (!state.chatPeopleHistory[targetName]) {
                state.chatPeopleHistory[targetName] = [];
            }
            const isExist = state.chatPeopleHistory[targetName].find(m => {
                if (m.id !== 0 && message.id !== 0) {
                    return m.id === message.id;
                }

                return m.createAt === message.createAt && m.mes === message.mes;
            });

            if (!isExist) {
                state.chatPeopleHistory[targetName].push(message);
            }

            const userIndex = state.userList.findIndex(u => u.name.toLowerCase() === targetName.toLowerCase());

            if (userIndex !== -1) {
                const updatedUser = {
                    ...state.userList[userIndex],
                    actionTime: message.createAt
                };

                state.userList = [
                    updatedUser,
                    ...state.userList.filter((_, index) => index !== userIndex)
                ];
            } else {
                // if u chat to new user that u have never chatted to them before
                const newUser: ReceiveMsgGetUserListPayload = {
                    name: targetName,
                    type: 0,
                    actionTime: message.createAt
                };

                state.userList = [newUser, ...state.userList];
            }
            state.isLoading = false;
        },
        addNewUserToSidebar: (state, action: PayloadAction<ReceiveMsgGetUserListPayload>) => {
            const newUser = action.payload;
            const exists = state.userList.find(u => u.name.toLowerCase() === newUser.name.toLowerCase());

            if (!exists) {
                state.userList = [newUser, ...state.userList];
            }
        },
        receiveNewMessageFromRoom: (state, action: PayloadAction<ReceiveMsgSendChatRoomPayload>) => {
            const payload = action.payload;
            const target = payload.to
            if (state.roomHistory[target]) {
                const formattedMessage = {
                    ...payload,
                    createAt: payload.createAt || new Date().toISOString()
                };
                const msg = JSON.parse(payload.mes) as MessageContent
                state.attachmentHistory[target].push(...msg.attachment)
                state.roomHistory[target].chatData.push(formattedMessage);
            }
        },
        sendMessageToRoom: (state, action: PayloadAction<{ roomName: string, message: any, username: string }>) => {
            const { roomName, message, username } = action.payload;
            if (!state.roomHistory[roomName]) {
                state.roomHistory[roomName] = {
                    id: Date.now(),
                    name: roomName,
                    own: username,
                    userList: [{ id: 1, name: username }],
                    chatData: []
                };
            }
            const newMsg = {
                id: Date.now(),
                name: username,
                to: roomName,
                mes: typeof message === "string" ? message : JSON.stringify(message),
                type: 1,
                createAt: new Date().toISOString()
            };
            state.roomHistory[roomName].chatData.push(newMsg);

            try {
                const parsed = typeof message === "string" ? JSON.parse(message) : message;
                if (parsed.attachment && parsed.attachment.length > 0) {
                    if (!state.attachmentHistory[roomName]) state.attachmentHistory[roomName] = [];
                    state.attachmentHistory[roomName].push(...parsed.attachment);
                }
            } catch (_) {}

            const userIndex = state.userList.findIndex(u => u.name.toLowerCase() === roomName.toLowerCase());
            if (userIndex !== -1) {
                const updated = { ...state.userList[userIndex], actionTime: newMsg.createAt };
                state.userList = [updated, ...state.userList.filter((_, idx) => idx !== userIndex)];
            } else {
                state.userList = [{ name: roomName, type: 1, actionTime: newMsg.createAt }, ...state.userList];
            }
            state.isLoading = false;
        },
        setInputValue: (state, action: PayloadAction<string>) => {
            state.inputValue = action.payload;
        },
        setEmojiInputValue: (state, action: PayloadAction<string>) => {
            state.inputValue += action.payload;
        },
        setViewAttachmentIndex: (state, action: PayloadAction<{ state: boolean, index: number }>) => {
            state.currentViewAttachment = action.payload
        },
        receiveOldMessageRoom: (state, action: PayloadAction<ReceiveMsgGetChatRoomPayload>) => {
            const message = action.payload;
            state.roomHistory[message.name].chatData = [
                ...message.chatData.reverse(),
                ...state.roomHistory[message.name].chatData
            ]
            if(message.chatData.length === 0) {
                state.currentPageRoom[message.name].continue = false
            } else {
                state.currentPageRoom[message.name].page += 1;
            }
        }
    },
});

export const {
    getUserList,
    getPeopleChatHistory,
    getRoomChatHistory,
    sendPeopleChat,
    setUserList,
    setCurrentChatTarget,
    setPeopleChatHistory,
    updateRoomHistory,
    receiveNewPeopleMessage,
    receiveNewMessageFromRoom,
    sendMessageToRoom,
    addNewUserToSidebar,
    setInputValue,
    setEmojiInputValue,
    setViewAttachmentIndex,
    receiveOldMessageRoom,
} = chatSlice.actions;

export default chatSlice.reducer;