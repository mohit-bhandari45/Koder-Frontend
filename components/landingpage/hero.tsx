"use client";

import { ArrowRight, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { codeSnippets, languages } from "./data";

const Hero = () => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-8">
          <Badge className="mb-4 bg-white/10 text-white border-white/20 p-1.5">
            <Unlock className="w-3 h-3 mr-1" />
            Free Code Editor - No Login Required
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white leading-tight">
            Code.
            <br />
            <span className="text-gray-400">Execute.</span>
            <br />
            <span className="text-gray-600">Master.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Start coding immediately with our free online editor supporting 15+
            languages. No registration needed to write and run code. Join to
            unlock challenges and track your progress.
          </p>
        </div>

        {/* Code Preview */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                <div className="w-3 h-3 bg-white/20 rounded-full"></div>
              </div>
              <Badge className="bg-white text-black border-none">
                {languages[currentLanguage]}
              </Badge>
            </div>
            <div className="text-left">
              <pre className="text-gray-300 text-lg font-mono">
                <code>{codeSnippets[currentLanguage]}</code>
              </pre>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            data-nprogress
            className="bg-white cursor-pointer text-black hover:bg-gray-200 border-none px-8 py-6 text-lg group"
            onClick={() => {
              router.push("/code-editor");
            }}
          >
            Try Editor Now - Free
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            data-nprogress
            className="border-white/20 cursor-pointer text-black hover:bg-white/10 hover:text-white px-8 py-6 text-lg"
            onClick={() => {
              router.push("/auth/signup");
            }}
          >
            Browse Challenges
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
