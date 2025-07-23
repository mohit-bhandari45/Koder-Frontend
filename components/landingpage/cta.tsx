import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CTA = () => {
  const router = useRouter();

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-3xl p-12 backdrop-blur-md border border-white/10">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Start Coding in Seconds
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            No downloads, no setup, no registration needed. Jump straight into
            coding with our free online editor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-black cursor-pointer hover:bg-gray-200 border-none px-8 py-6 text-lg"
              data-nprogress
              onClick={() => {
                router.push("/code-editor");
              }}
            >
              Open Free Editor
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              Explore Challenges
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
