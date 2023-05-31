import SignupForm from "./SignupForm";
import LoginProvider from "../LoginProvider";

export default function Page() {
    
    return (
        <div className="min-h-screen w-screen flex flex-col justify-center items-center bg-white md:bg-inherit">
            <LoginProvider>
                <SignupForm />
            </LoginProvider>    
        </div>
    );
}