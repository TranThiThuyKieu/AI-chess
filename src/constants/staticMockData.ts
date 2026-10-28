import type { User } from "./User";
import type {
    ReceiveMsgGetChatPeoplePayload,
    ReceiveMsgGetChatRoomPayload,
    ReceiveMsgGetUserListPayload
} from "@/socket/types/WebsocketReceivePayload";

export const DEFAULT_MOCK_USER: User = {
    username: "longchat_user",
    displayName: "Nguyễn Hoàng Long",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
    banner: {
        type: "image",
        content: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80"
    },
    description: "Xin chào! Mình là lập trình viên đam mê công nghệ và giao diện web hiện đại."
};

export const MOCK_USER_LIST: ReceiveMsgGetUserListPayload[] = [
    {
        name: "My Document",
        type: 0,
        actionTime: new Date(Date.now() - 5 * 60 * 1000).toISOString()
    },
    {
        name: "Trần Mai Anh",
        type: 0,
        actionTime: new Date(Date.now() - 2 * 60 * 1000).toISOString()
    },
    {
        name: "Nhóm Dự Án Web - NLU",
        type: 1,
        actionTime: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    },
    {
        name: "Nguyễn Văn Nam",
        type: 0,
        actionTime: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    },
    {
        name: "CLB Lập Trình Sinh Viên",
        type: 1,
        actionTime: new Date(Date.now() - 120 * 60 * 1000).toISOString()
    },
    {
        name: "Lê Hoàng Phúc",
        type: 0,
        actionTime: new Date(Date.now() - 240 * 60 * 1000).toISOString()
    },
    {
        name: "Phạm Thu Thảo",
        type: 0,
        actionTime: new Date(Date.now() - 360 * 60 * 1000).toISOString()
    }
];

export const MOCK_CHAT_PEOPLE_HISTORY: Record<string, ReceiveMsgGetChatPeoplePayload[]> = {
    "Trần Mai Anh": [
        {
            id: 1,
            name: "Trần Mai Anh",
            to: "longchat_user",
            mes: JSON.stringify({
                content: "Chào bạn! Tiến độ dự án LongChat của nhóm mình đến đâu rồi?",
                type: "chat",
                attachment: []
            }),
            type: 0,
            createAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
        },
        {
            id: 2,
            name: "longchat_user",
            to: "Trần Mai Anh",
            mes: JSON.stringify({
                content: "Chào Mai Anh! Mình vừa hoàn thành xong toàn bộ giao diện tĩnh của hệ thống rồi nhé.",
                type: "chat",
                attachment: []
            }),
            type: 0,
            createAt: new Date(Date.now() - 25 * 60 * 1000).toISOString()
        },
        {
            id: 3,
            name: "longchat_user",
            to: "Trần Mai Anh",
            mes: JSON.stringify({
                content: "Giao diện hoạt động cực kỳ mượt mà, hỗ trợ gửi tin nhắn, sticker, emoji, hình ảnh và đổi theme sáng/tối.",
                type: "chat",
                attachment: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"]
            }),
            type: 0,
            createAt: new Date(Date.now() - 20 * 60 * 1000).toISOString()
        },
        {
            id: 4,
            name: "Trần Mai Anh",
            to: "longchat_user",
            mes: JSON.stringify({
                content: "Tuyệt vời quá! Thiết kế nhìn rất sang và hiện đại luôn 🌟 Nhóm mình chuẩn bị thuyết trình được rồi!",
                type: "chat",
                attachment: []
            }),
            type: 0,
            createAt: new Date(Date.now() - 2 * 60 * 1000).toISOString()
        }
    ],
    "Nguyễn Văn Nam": [
        {
            id: 11,
            name: "Nguyễn Văn Nam",
            to: "longchat_user",
            mes: JSON.stringify({
                content: "Long ơi, tối nay có rảnh không, chúng mình trao đổi qua một chút về bài thuyết trình nhé?",
                type: "chat",
                attachment: []
            }),
            type: 0,
            createAt: new Date(Date.now() - 90 * 60 * 1000).toISOString()
        },
        {
            id: 12,
            name: "longchat_user",
            to: "Nguyễn Văn Nam",
            mes: JSON.stringify({
                content: "Ok Nam nhé! Tầm 8h tối nay mình họp nhóm trên Google Meet là đẹp.",
                type: "chat",
                attachment: []
            }),
            type: 0,
            createAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
        }
    ],
    "My Document": [
        {
            id: 21,
            name: "longchat_user",
            to: "longchat_user",
            mes: JSON.stringify({
                content: "📌 Ghi chú công việc: Kiểm tra lại toàn bộ giao diện tĩnh và các tính năng tương tác UI trước khi nộp bài.",
                type: "chat",
                attachment: []
            }),
            type: 0,
            createAt: new Date(Date.now() - 120 * 60 * 1000).toISOString()
        },
        {
            id: 22,
            name: "longchat_user",
            to: "longchat_user",
            mes: JSON.stringify({
                content: "Link tài liệu tham khảo thiết kế giao diện UI/UX hiện đại.",
                type: "chat",
                attachment: ["https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80"]
            }),
            type: 0,
            createAt: new Date(Date.now() - 5 * 60 * 1000).toISOString()
        }
    ],
    "Lê Hoàng Phúc": [
        {
            id: 31,
            name: "Lê Hoàng Phúc",
            to: "longchat_user",
            mes: JSON.stringify({
                content: "Giao diện mới chạy mượt lắm bạn ơi, màu sắc phối rất đẹp mắt!",
                type: "chat",
                attachment: []
            }),
            type: 0,
            createAt: new Date(Date.now() - 240 * 60 * 1000).toISOString()
        }
    ],
    "Phạm Thu Thảo": [
        {
            id: 41,
            name: "Phạm Thu Thảo",
            to: "longchat_user",
            mes: JSON.stringify({
                content: "Cảm ơn bạn đã hỗ trợ mình làm slide thuyết trình nha! 👍",
                type: "chat",
                attachment: []
            }),
            type: 0,
            createAt: new Date(Date.now() - 360 * 60 * 1000).toISOString()
        }
    ]
};

export const MOCK_ROOM_HISTORY: Record<string, ReceiveMsgGetChatRoomPayload> = {
    "Nhóm Dự Án Web - NLU": {
        id: 1,
        own: "longchat_user",
        name: "Nhóm Dự Án Web - NLU",
        userList: [
            { id: 1, name: "longchat_user" },
            { id: 2, name: "Trần Mai Anh" },
            { id: 3, name: "Nguyễn Văn Nam" },
            { id: 4, name: "Lê Hoàng Phúc" }
        ],
        chatData: [
            {
                id: 101,
                name: "Trần Mai Anh",
                to: "Nhóm Dự Án Web - NLU",
                mes: JSON.stringify({
                    content: "Chào mọi người trong nhóm! Chúng ta bắt đầu rà soát sản phẩm nhé.",
                    type: "chat",
                    attachment: []
                }),
                type: 1,
                createAt: new Date(Date.now() - 180 * 60 * 1000).toISOString()
            },
            {
                id: 102,
                name: "Nguyễn Văn Nam",
                to: "Nhóm Dự Án Web - NLU",
                mes: JSON.stringify({
                    content: "Phần tài liệu hướng dẫn và báo cáo mình đã hoàn thiện xong rồi.",
                    type: "chat",
                    attachment: []
                }),
                type: 1,
                createAt: new Date(Date.now() - 90 * 60 * 1000).toISOString()
            },
            {
                id: 103,
                name: "longchat_user",
                to: "Nhóm Dự Án Web - NLU",
                mes: JSON.stringify({
                    content: "Toàn bộ giao diện tĩnh đã được hoàn thiện 100%, chạy mượt mà ngay trên trình duyệt mà không cần backend hay server phức tạp.",
                    type: "chat",
                    attachment: ["https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80"]
                }),
                type: 1,
                createAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
            }
        ]
    },
    "CLB Lập Trình Sinh Viên": {
        id: 2,
        own: "longchat_user",
        name: "CLB Lập Trình Sinh Viên",
        userList: [
            { id: 1, name: "longchat_user" },
            { id: 2, name: "Trần Mai Anh" },
            { id: 3, name: "Phạm Thu Thảo" }
        ],
        chatData: [
            {
                id: 201,
                name: "Phạm Thu Thảo",
                to: "CLB Lập Trình Sinh Viên",
                mes: JSON.stringify({
                    content: "Cuối tuần này CLB có buổi chia sẻ về Frontend React & Tailwind nha cả nhà!",
                    type: "chat",
                    attachment: []
                }),
                type: 1,
                createAt: new Date(Date.now() - 120 * 60 * 1000).toISOString()
            }
        ]
    }
};

export const MOCK_STICKERS = [
    {
        src: "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif",
        preview: "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif"
    },
    {
        src: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif",
        preview: "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
    },
    {
        src: "https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif",
        preview: "https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif"
    },
    {
        src: "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
        preview: "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif"
    },
    {
        src: "https://media.giphy.com/media/11ISw6cxFx0jK/giphy.gif",
        preview: "https://media.giphy.com/media/11ISw6cxFx0jK/giphy.gif"
    },
    {
        src: "https://media.giphy.com/media/unQ3IJU2RG7DO/giphy.gif",
        preview: "https://media.giphy.com/media/unQ3IJU2RG7DO/giphy.gif"
    },
    {
        src: "https://media.giphy.com/media/ule4akeXnY9fb434Gu/giphy.gif",
        preview: "https://media.giphy.com/media/ule4akeXnY9fb434Gu/giphy.gif"
    },
    {
        src: "https://media.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif",
        preview: "https://media.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif"
    },
    {
        src: "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif",
        preview: "https://media.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif"
    },
    {
        src: "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
        preview: "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"
    },
    {
        src: "https://media.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.gif",
        preview: "https://media.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.gif"
    },
    {
        src: "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
        preview: "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif"
    }
];
