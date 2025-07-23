export const languageOptions = [
  {
    label: "JavaScript",
    value: "javascript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    label: "TypeScript",
    value: "typescript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    label: "Python",
    value: "python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    label: "Java",
    value: "java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    label: "C++",
    value: "cpp",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    label: "C",
    value: "c",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    label: "Go",
    value: "go",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },
  {
    label: "Ruby",
    value: "ruby",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  },
  {
    label: "Rust",
    value: "rust",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
  },
  {
    label: "PHP",
    value: "php",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  {
    label: "Kotlin",
    value: "kotlin",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  {
    label: "Swift",
    value: "swift",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  },
  {
    label: "Perl",
    value: "perl",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg",
  },
  {
    label: "Scala",
    value: "scala",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg",
  },
  {
    label: "Haskell",
    value: "haskell",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg",
  },
  {
    label: "Shell (Bash)",
    value: "bash",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  {
    label: "C#",
    value: "csharp",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  {
    label: "R",
    value: "r",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  },
  {
    label: "Dart",
    value: "dart",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  },
  {
    label: "Elixir",
    value: "elixir",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg",
  },
];

export const defaultComments: Record<string, string> = {
  python: "# Start coding here",
  javascript: "// Start coding here",
  typescript: "// Start coding here",
  java: `import java.util.*; // You can add more imports

public class Main {
    // Define your solution here
    public static int[] twoSum(int[] nums, int target) {
        // Your logic here
        return new int[]{};
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String[] parts = sc.nextLine().trim().split(" ");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i]);
        }
        int target = Integer.parseInt(sc.nextLine().trim());

        int[] result = twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
}`,

  cpp: "// Start coding here",
  c: "// Start coding here",
  go: "// Start coding here",
  php: "// Start coding here",
  ruby: "# Start coding here",
  swift: "// Start coding here",
  kotlin: "// Start coding here",
  rust: "// Start coding here",
  r: "# Start coding here",
  scala: "// Start coding here",
  perl: "# Start coding here",
  haskell: "-- Start coding here",
  lua: "-- Start coding here",
  dart: "// Start coding here",
};



export const themeOptions = [
  { label: "VS Dark", value: "vs-dark" },
  { label: "VS Light", value: "vs" },
  { label: "High Contrast", value: "hc-black" },
  { label: "Dracula", value: "dracula" },
  { label: "Solarized", value: "solarized" },
];