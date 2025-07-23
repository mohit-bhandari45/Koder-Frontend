"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Code, Lock, Play, Trophy, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const Features = () => {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Code className="w-8 h-8 text-white" />,
      title: "Free Code Editor",
      description:
        "Write and execute code in 15+ programming languages instantly. No login required - start coding immediately in your browser.",
      access: "free",
      gradient: "from-gray-800 to-gray-900",
    },
    {
      icon: <Play className="w-8 h-8 text-white" />,
      title: "Instant Execution",
      description:
        "Run your code instantly with our fast, secure cloud-based execution environment. Test your ideas without any setup.",
      access: "free",
      gradient: "from-gray-700 to-gray-800",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-white" />,
      title: "Coding Challenges",
      description:
        "Practice with curated coding problems from beginner to advanced levels. Account required to track progress and save solutions.",
      access: "free",
      gradient: "from-gray-900 to-black",
    },
    {
      icon: <Trophy className="w-8 h-8 text-white" />,
      title: "Solution Library",
      description:
        "Access multiple solution approaches with detailed explanations and complexity analysis. Login to unlock premium solutions.",
      access: "free",
      gradient: "from-black to-gray-900",
    },
  ];

  return (
    <section className="relative z-10 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Start Free Today
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Use our powerful code editor for free, and solve challenges for free
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              id={`feature-${index}`}
              data-animate
              className={`bg-gradient-to-br ${
                feature.gradient
              } border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 ${
                isVisible[`feature-${index}`]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md p-3">
                    {feature.icon}
                  </div>
                  <div className="flex items-center space-x-2">
                    {feature.access === "free" ? (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        <Unlock className="w-3 h-3 mr-1" />
                        Free
                      </Badge>
                    ) : (
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                        <Lock className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-2xl text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
