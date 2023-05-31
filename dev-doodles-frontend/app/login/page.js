import LoginProvider from "../LoginProvider";
import LoginForm from "./LoginForm";

export default function Page() {

    
    return (
        <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-white md:bg-inherit">
            <LoginProvider>
                <LoginForm />
            </LoginProvider>
        </div>
    );
}