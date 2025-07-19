"use client"

import Hero from '@/components/landingpage/hero';
import Navbar from '@/components/shared/navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, Code, Lock, Play, Trophy, Unlock } from "lucide-react";
import { useEffect, useState } from 'react';

export default function CodeEditorLanding() {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Code className="w-8 h-8 text-white" />,
      title: "Free Code Editor",
      description: "Write and execute code in 15+ programming languages instantly. No login required - start coding immediately in your browser.",
      access: "free",
      gradient: "from-gray-800 to-gray-900"
    },
    {
      icon: <Play className="w-8 h-8 text-white" />,
      title: "Instant Execution",
      description: "Run your code instantly with our fast, secure cloud-based execution environment. Test your ideas without any setup.",
      access: "free",
      gradient: "from-gray-700 to-gray-800"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-white" />,
      title: "Coding Challenges",
      description: "Practice with curated coding problems from beginner to advanced levels. Account required to track progress and save solutions.",
      access: "premium",
      gradient: "from-gray-900 to-black"
    },
    {
      icon: <Trophy className="w-8 h-8 text-white" />,
      title: "Solution Library",
      description: "Access multiple solution approaches with detailed explanations and complexity analysis. Login to unlock premium solutions.",
      access: "premium",
      gradient: "from-black to-gray-900"
    }
  ];

  const stats = [
    { number: "15+", label: "Languages Supported" },
    { number: "Free", label: "Code Editor Access" },
    { number: "500+", label: "Coding Challenges" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Navigation */}
      <Navbar/>

      {/* HeroSection */}
      <Hero/>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Start Free, Upgrade When Ready
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Use our powerful code editor for free, then unlock premium features to accelerate your coding journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                id={`feature-${index}`}
                data-animate
                className={`bg-gradient-to-br ${feature.gradient} border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 ${
                  isVisible[`feature-${index}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md p-3">
                      {feature.icon}
                    </div>
                    <div className="flex items-center space-x-2">
                      {feature.access === 'free' ? (
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
                  <CardTitle className="text-2xl text-white">{feature.title}</CardTitle>
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

      {/* Access Levels Section */}
      <section className="relative z-10 px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Choose Your Access Level
            </h2>
            <p className="text-lg text-gray-300">
              Start with our free editor, upgrade to unlock challenges and solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-white/10">
              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Unlock className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-2xl text-white">Free Access</CardTitle>
                <CardDescription className="text-gray-400">Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Full-featured code editor</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">15+ programming languages</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Instant code execution</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">No registration required</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-black to-gray-900 border-white/20">
              <CardHeader className="text-center pb-2">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl text-white">Premium Access</CardTitle>
                <CardDescription className="text-gray-400">Unlock your full potential</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-gray-300">Everything in Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-gray-300">500+ coding challenges</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-gray-300">Detailed solution explanations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-gray-300">Progress tracking & stats</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span className="text-gray-300">Save & share solutions</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-3xl p-12 backdrop-blur-md border border-white/10">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Start Coding in Seconds
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              No downloads, no setup, no registration needed. 
              Jump straight into coding with our free online editor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 border-none px-8 py-6 text-lg"
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

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white">
                CodeCraft
              </span>
            </div>
            <div className="flex items-center space-x-6 text-gray-400">
              <span>© 2025 CodeCraft. All rights reserved.</span>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}