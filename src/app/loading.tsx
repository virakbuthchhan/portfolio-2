import { SparklesText } from "@/components/ui/sparkles-text"
import {TypingAnimation} from "@/components/ui/typing-animation";

export default function Loading() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <SparklesText className="text-2xl font-semibold">
                <TypingAnimation>
                    កំពុងដំណើរការ...
                </TypingAnimation>
            </SparklesText>
        </div>
    )
}
