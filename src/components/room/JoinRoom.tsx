import { setOpenJoinRoom } from "@/redux/slices/chatTriggerSlice.ts";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUserToSidebar, setCurrentChatTarget, updateRoomHistory } from "@/redux/slices/chatSlice.ts";
import { MOCK_ROOM_HISTORY } from "@/constants/staticMockData";

export default function JoinRoom() {
    const [error, setError] = useState<string>('');
    const [name, setName] = useState<string>('');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const handleJoinRoom = () => {
        if (!name.trim()) {
            setError("Tên nhóm không được để trống!");
            return;
        }
        setLoading(true);
        const roomName = name.trim();

        setTimeout(() => {
            setLoading(false);
            const existingRoom = MOCK_ROOM_HISTORY[roomName] || {
                id: Date.now(),
                name: roomName,
                own: "longchat_user",
                userList: [
                    { id: 1, name: "longchat_user" }
                ],
                chatData: []
            };

            dispatch(updateRoomHistory(existingRoom));
            const newChatTarget = {
                name: roomName,
                type: 1,
                actionTime: new Date().toISOString(),
            };

            dispatch(addNewUserToSidebar(newChatTarget));
            dispatch(setCurrentChatTarget(newChatTarget));
            dispatch(setOpenJoinRoom(false));
        }, 200);
    };

    return (
        <div className="fixed content-center inset-0 bg-neutral-700/50 z-50"
            onClick={() => dispatch(setOpenJoinRoom(false))}>
            <div className="p-4 border bg-white dark:bg-gray-800 mx-auto w-100 rounded-lg shadow-xl" onClick={(event) => event.stopPropagation()}>
                <div className="px-4 text-center pb-4">
                    <p className="text-lg font-semibold">Tham gia nhóm</p>
                    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                </div>

                <div className="flex justify-center items-center pb-4">
                    <label htmlFor="room-name" className="pe-2 text-sm font-medium">Tên nhóm</label>
                    <input id="room-name" className="rounded-lg ms-2 px-3 h-10 flex-1 w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                        placeholder="Nhập tên nhóm..." maxLength={100} value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                            if (error) setError('');
                        }} required />
                </div>
                <div className="text-end">
                    <button className="h-[2.5rem] cursor-pointer p-2 px-4 rounded-lg dark:bg-neutral-700/40 dark:hover:text-neutral-300
                        bg-gray-100 hover:bg-gray-100/50 hover:text-neutral-500 me-2"
                        onClick={() => dispatch(setOpenJoinRoom(false))}>Hủy
                    </button>
                    <button className={`h-[2.5rem] p-2 px-4 rounded-lg
                        ${loading ? "bg-indigo-400" : "bg-indigo-500 hover:bg-indigo-400 cursor-pointer"} text-white`} disabled={loading}
                        onClick={handleJoinRoom}
                    >{loading ? "Đang tham gia..." : "Tham gia"}
                    </button>
                </div>
            </div>
        </div>
    );
}