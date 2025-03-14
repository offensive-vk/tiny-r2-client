export default function Hero() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-black">
            <h2 className="text-2xl mb-6 text-black dark:text-white animate-fade-in-up">
                <span className="inline-block animate-wave">👋</span>
                <span className="inline-block animate-slide-in">Hello</span>
                <span className="inline-block animate-slide-in [animation-delay:200ms]"> Everyone!</span>
            </h2>

            <div className="flex gap-4">
                <a 
                    href="https://github.com/offensive-vk/tiny-r2-client"
                    className="w-32 text-center p-2 rounded transition-all duration-300 bg-black dark:bg-white text-white dark:text-black 
                            cursor-pointer hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white border
                            border-black dark:border-white"
                > 
                    Source
                </a>
                <a 
                    href="/login"
                    className="w-32 text-center p-2 rounded transition-all duration-300 bg-black dark:bg-white text-white dark:text-black 
                            cursor-pointer hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white border
                            border-black dark:border-white"
                > 
                    Login
                </a>
            </div>
        </div>
    );
}