import { addNewUserToSidebar, setCurrentChatTarget, updateRoomHistory } from "@/redux/slices/chatSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CircleCheckBig } from "lucide-react";
import { MOCK_ROOM_HISTORY } from "@/constants/staticMockData";

export function JoinRoomByLink() {
    const [message, setMessage] = useState("");
    const { roomName } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (roomName) {
            const trimmedName = decodeURIComponent(roomName).trim();
            const existingRoom = MOCK_ROOM_HISTORY[trimmedName] || {
                id: Date.now(),
                name: trimmedName,
                own: "longchat_user",
                userList: [
                    { id: 1, name: "longchat_user" }
                ],
                chatData: []
            };

            dispatch(updateRoomHistory(existingRoom));
            const newChatTarget = {
                name: trimmedName,
                type: 1,
                actionTime: new Date().toISOString(),
            };

            dispatch(addNewUserToSidebar(newChatTarget));
            dispatch(setCurrentChatTarget(newChatTarget));
            setMessage(`Tham gia nhóm "${trimmedName}" thành công!`);

            const timer = setTimeout(() => {
                navigate("/chat");
            }, 800);

            return () => clearTimeout(timer);
        } else {
            navigate("/chat");
        }
    }, [roomName, dispatch, navigate]);

    return (
        <div className="w-screen h-screen absolute top-0 left-0 z-100 bg-white dark:bg-gray-900 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
                <CircleCheckBig className="size-12 text-green-500" />
                <p className="text-xl mt-4 font-medium">{message || "Đang chuyển đến phòng chat..."}</p>
            </div>
        </div>
    );
}