import {twMerge} from "tailwind-merge";
import {useState} from "react"
import { ArrowForward, ArrowBack, Login, Visibility, VisibilityOff, Warning, Close, Home } from '@nine-thirty-five/material-symbols-react/outlined'
import {SpringButton} from "../elements/SpringButton.jsx"
import {HashLoader} from "react-spinners";
import {Button} from "../elements/Button.jsx";
import useUsersStore from "../stores/useUsersStore.ts";
import useUserSessionStore from "../stores/useUserSessionStore.ts";
import useUiStore from "../stores/useUiStore.ts";
import FullscreenPage from "../types/FullscreenPage.ts";

export default function LoginPage() {
    //states
    const [step, setStep] = useState("username")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    //translation
    const strings = useUiStore((state) => state.strings)
    const getString = useUiStore((state) => state.getString)

    // login function
    const handleLogin = async () => {
        setIsLoading(true);

        try {
            const response = await fetch("http://" + window.location.hostname + ":34006" + "/api/auth/loginStudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                }),
            })

            const responseText = await response.text();
            if (!response.ok) throw new Error(responseText);

            const jsonObject = JSON.parse(responseText);
            useUsersStore.getState().add(jsonObject)
            useUserSessionStore.getState().changeUser(jsonObject)
            useUiStore.getState().changeView(FullscreenPage.MAIN_NAVIGATION)
        } catch (err) {
            setError(err.message || getString("loginpage.unknownError", strings))
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-dvw h-dvh relative">
            {/* Return to the Homepage button */}
            {!useUserSessionStore.getState().loginRequired && (
                <div className="absolute top-4 left-4">
                    <Button variant="filled" icon={<Home size={20}/>} onClick={() => useUiStore.getState().changeView(FullscreenPage.MAIN_NAVIGATION)} />
                </div>
            )}

            <div className="flex flex-col justify-center items-center gap-10">
                {/*Input entries*/}
                <div className="relative w-full min-w-2xs h-20 overflow-hidden">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder={getString("loginpage.nameplaceholder", strings)}
                        className={twMerge(
                            "w-full h-full outline-0 absolute placeholder:font-bold placeholder:text-xl p-4 transition-[top,bottom] duration-200 border-b border-(--bg-dark-mod)",
                                step === "username" ? "bottom-0" : "bottom-20"
                        )}
                    />
                    <input
                        type={ showPassword ? "username" : "password"}
                        value={password}
                        placeholder={getString("loginpage.pwdplaceholder", strings)}
                        onChange={(e) => setPassword(e.target.value)}
                        className={twMerge(
                            "w-full h-full outline-0 absolute placeholder:font-bold placeholder:text-xl p-4 transition-[top,bottom] duration-200 border-t border-(--bg-dark-mod)",
                                step === "password" ? "top-0" : "top-20"
                        )}
                    />
                </div>

                {/*Back, Next/Login, Show buttons*/}
                <div className="flex w-full box-border">
                    <SpringButton
                        icon={
                            <ArrowBack />
                        }
                        open={step === "password" }
                        variant="flat"
                        onClick={() => setStep("username")}

                    />
                    <SpringButton
                        icon={
                            step === "username" ? <ArrowForward /> : <Login />
                        }
                        variant="filled"
                        fill
                        className={step === "username" ? "" : "ml-2 mr-2"}
                        onClick={() => step === "username" ? setStep("password") : handleLogin()}
                        label={
                            step === "username" ? getString("loginpage.next", strings) : getString("loginpage.login", strings)
                        }
                    />
                    <SpringButton
                        icon={
                            showPassword ?
                                <Visibility />    :
                                <VisibilityOff />
                        }
                        open={step === "password"}
                        variant={ showPassword ? "filled" : "flat"}
                        onClick={() => setShowPassword(!showPassword)}

                    />
                </div>
            </div>

            {/*Error Sheet*/}
            <div
                className={ twMerge(
                    "flex absolute p-4 text-white flex-col",
                    "justify-center items-start gap-2 min-w-sm",
                    "min-h-10 bg-(--err-color) rounded-md",
                    "transition-[top] duration-500 ease-in-out",
                    error === "" ? "-top-25" : "top-2"
                )}
            >
                <div className="flex w-full flex-row justify-between">
                    <div className="pt-2 pl-1">
                        <Warning />
                    </div>
                    <SpringButton
                        icon={
                            <Close />
                        }
                        onClick={() => setError("")}
                    />
                </div>
                {error}
            </div>

            {/*Loading Screen*/}
            <div
                className={ twMerge(
                    "absolute w-full h-full bg-(--bg-color) flex",
                    "flex-col justify-center items-center",
                    "transition-opacity duration-500 pointer-events-none",
                    isLoading ? "opacity-100" : "opacity-0"
                )}
            >
                <HashLoader color="#888" />
            </div>
        </div>
    )
}