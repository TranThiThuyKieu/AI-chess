import type { ReduxState } from "@/constants/ReduxState"
import { useDispatch, useSelector } from "react-redux"
import { setAuthFormValue } from "@/redux/slices/authSlice"
import { useState } from "react"
import { validateForm } from "@/services/authService"
import { useNavigate } from "react-router-dom"
import { FormType } from "@/constants/AuthForm"
import { setCurrentUser } from "@/redux/slices/userSlice"
import { AuthFooter } from "./Footer"
import type { User } from "@/constants/User"
import { DEFAULT_MOCK_USER } from "@/constants/staticMockData"

export default function LoginComponent() {
    const dispatcher = useDispatch()
    const currentForm = useSelector((state: ReduxState) => state.authForm)

    // Local state
    const [loading, isLoading] = useState(false)
    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const handleForm = () => {
        const validateFormResult = validateForm(currentForm, FormType.LOGIN)
        if (validateFormResult.result) {
            isLoading(true)
            const username = currentForm.username.trim()
            const currentUser: User = {
                ...DEFAULT_MOCK_USER,
                username: username,
                displayName: username,
            }

            localStorage.setItem("user", JSON.stringify(currentUser))
            localStorage.setItem("RE_LOGIN_CODE", "STATIC_MOCK_" + Date.now())
            dispatcher(setCurrentUser(currentUser))
            setMessage("Đăng nhập thành công!")
            setTimeout(() => {
                navigate("/chat")
            }, 400)
        } else {
            setMessage(validateFormResult.message)
        }
    }

    const handleInputChange = (key: 'username' | 'password', value: string) => {
        dispatcher(setAuthFormValue({
            key: key,
            value: value
        }))
    }

    return (
        <div className="flex dark:bg-gray-800 dark:text-white justify-between items-center flex-col relative" style={{ width: "100%", height: "100vh" }}>
            <div className="w-100 h-full flex justify-center p-8 bg-white dark:bg-gray-900">
                <div>
                    <div className="text-center mb-8 flex flex-col items-center">
                        <div className="mb-2 text-white flex justify-center items-center bg-appchat-bluesky text-2xl w-14 h-14 rounded-full">
                            <i className="fa-solid fa-comment"></i>
                        </div>
                        <h4 className="text-2xl font-semibold mb-1">Đăng nhập</h4>
                        <p>Đăng nhập tài khoản để trải nghiệm cùng LongChat</p>
                    </div>
                    <div className="w-full">
                        <div className="mb-5">
                            <p className="font-semibold mb-1 text-sm">Tên người dùng</p>
                            <input
                                className="w-full border border-gray-400 p-1 py-2 ps-3 rounded-md"
                                type="text"
                                placeholder="Nhập tên người dùng..."
                                value={currentForm.username}
                                onChange={(e) => handleInputChange("username", e.target.value)}
                            />
                        </div>
                        <div className="mb-5">
                            <div className="flex justify-between mb-1">
                                <p className="font-semibold text-sm">Mật khẩu</p>
                            </div>
                            <input
                                className="w-full border border-gray-400 p-1 py-2 ps-3 rounded-md"
                                type="password"
                                placeholder="Nhập mật khẩu..."
                                value={currentForm.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                            />
                        </div>
                        {message && <p className={`text-center text-sm ${message.includes("thành công") ? "text-green-600" : "text-red-500"}`}>{message}</p>}
                    </div>
                    <button
                        className="cursor-pointer mt-4 bg-appchat-bluesky hover:bg-blue-800/80 text-white p-2 rounded-md w-full disabled:bg-blue-900/70"
                        disabled={loading}
                        onClick={handleForm}
                    >
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                    <div className="mt-5">
                        <p className="text-center">Chưa có tài khoản? <span onClick={() => navigate('/register')} className="underline hover:text-gray-500 cursor-pointer">Đăng ký</span>
                        </p>
                    </div>
                </div>
            </div>
            <AuthFooter />
        </div>
    )
}