// lib/languageIdMap.ts

export const languageIdMap: Record<string, string> = {
  javascript: "javascript",
  python: "python3",
  java: "java",
  cpp: "cpp",
  c: "c",
  go: "go",
  ruby: "ruby",
  rust: "rust",
  kotlin: "kotlin",
  swift: "swift",
  perl: "perl",
  scala: "scala",
  haskell: "haskell",
  csharp: "csharp",
  r: "r",
  dart: "dart",
  elixir: "elixir",
};

// lib/languageIdMap.ts

export const languageIdMapJudge: Record<string, number> = {
  javascript: 63, // Node.js 18.x
  python: 71,     // Python 3.11
  java: 62,       // Java 17
  cpp: 54,        // C++ (GCC 13)
  c: 50,          // C (GCC 13)
  go: 95,         // Go 1.20
  ruby: 72,       // Ruby 3.2
  rust: 73,       // Rust 1.70
  kotlin: 78,     // Kotlin 1.8
  swift: 83,      // Swift 5.8
  perl: 85,       // Perl 5.36
  scala: 81,      // Scala 3.3
  haskell: 97,    // Haskell (GHC 9.4)
  csharp: 51,     // C# .NET 7
  r: 80,          // R 4.3
  dart: 96,       // Dart 3.0
  elixir: 98      // Elixir 1.15
};

