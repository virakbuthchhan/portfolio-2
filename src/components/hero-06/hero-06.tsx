import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { BackgroundPattern } from "./background-pattern";
import Link from "next/link";
import Particles from "@/components/Particles";
import DecryptedText from "@/components/DecryptedText";
import GlitchText from "@/components/GlitchText";
import SplitText from "@/components/SplitText";

export default function HeroSix() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <BackgroundPattern />
      <div className="relative z-10 text-center max-w-3xl">
        <Badge
          variant="secondary"
          className="rounded-full py-1 border-border"
          asChild
        >
          <Link href="#">
            First Version v1.0.0 <ArrowUpRight className="ml-1 size-4" />
          </Link>
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed font-semibold tracking-tighter">
            <SplitText
                text="Welcome to LBX"
                delay={50}
                duration={0.25}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
            />
        </h1>
        <p className="mt-6 md:text-lg text-foreground/80">
            <DecryptedText speed={100} text="Learning Beyond eXpectations - Empowering Your Educational Journey" revealDirection="start"  animateOn="view"/>
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            Get Started <ArrowUpRight className="h-5! w-5!" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <CirclePlay className="h-5! w-5!" /> Watch Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
