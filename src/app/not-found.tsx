import React from "react";

import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    return (
        <section className="flex h-full min-h-screen w-screen items-center justify-center overflow-hidden py-32">
            <BackgroundLines className="container flex w-full flex-col items-center justify-center px-4 md:h-full">
                <h1 className="relative z-20 py-2 text-center font-sans text-5xl font-semibold tracking-tighter md:py-10 lg:text-8xl">
                    404
                </h1>
                <p className="text-md text-muted-foreground mx-auto max-w-xl text-center lg:text-lg">
                    មិនមានទំព័រនេះទេ
                </p>
                <Button className="h-10 rounded-xl mt-10">ត្រឡប់ក្រោយ</Button>
            </BackgroundLines>
        </section>
    );
};



export default NotFound;

