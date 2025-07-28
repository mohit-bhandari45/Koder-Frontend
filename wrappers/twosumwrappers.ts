import { indent } from "@/utils/helper";

export function getFunctionName(lang: string): string {
  const functionNameMap: Record<string, string> = {
    rust: "two_sum",
    elixir: "two_sum",
  };
  return functionNameMap[lang] ?? "twoSum";
}

export function wrapTwoSumJavaCode(userCode: string, lang: string = "java"): string {
    const functionName = getFunctionName(lang);
    return `
            import java.util.*;

            public class Main {

                ${indent(userCode, 1)}

                public static void main(String[] args) {
                    Scanner sc = new Scanner(System.in);
                    String[] parts = sc.nextLine().split(" ");
                    int[] nums = new int[parts.length];
                    for(int i=0;i<parts.length;i++){
                        nums[i] = Integer.parseInt(parts[i]);
                    }
                    int target = Integer.parseInt(sc.nextLine());

                    int[] result = ${functionName}(nums, target);
                    System.out.println(Arrays.toString(result));
                }
            }
        `.trim();
}

export function wrapTwoSumJavaScriptCode(userCode: string, lang: string = "javascript"): string {
    const functionName = getFunctionName(lang);
    return `
    ${userCode}

    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf-8').split('\\n');

    const nums = input[0].split(" ").map(Number);
    const target = parseInt(input[1]);

    const result = ${functionName}(nums, target);
    console.log(JSON.stringify(result).replace(",", ", "));
  `.trim();
}

export function wrapTwoSumPythonCode(userCode: string, lang: string = "python"): string {
    const functionName = getFunctionName(lang);
    return [
        userCode.trim(),
        "",
        "import sys",
        "lines = sys.stdin.read().splitlines()",
        "",
        "nums = list(map(int, lines[0].split()))",
        "target = int(lines[1])",
        "",
        `result = ${functionName}(nums, target)`,
        "print(result)"
    ].join("\n");
}

export function wrapTwoSumCppCode(userCode: string, lang: string = "cpp"): string {
    const functionName = getFunctionName(lang);
    return `
        #include <iostream>
        #include <vector>
        #include <sstream>
        #include <string>
        #include <unordered_map>
        #include <algorithm> // Added for std::sort (sorting-based approach)

        using namespace std;

        ${userCode}

        int main() {
            string line;
            getline(cin, line);
            istringstream iss(line);
            int num;
            vector<int> nums;
            while (iss >> num) nums.push_back(num);

            int target;
            cin >> target;

            vector<int> result = ${functionName}(nums, target);
            cout << "[";
            for (int i = 0; i < result.size(); ++i) {
                if (i > 0) cout << ", ";
                cout << result[i];
            }
            cout << "]" << endl;
            return 0;
        }
    `.trim();
}

export function wrapTwoSumCCode(userCode: string, lang: string = "c"): string {
    const functionName = getFunctionName(lang);
    return `
        #include <stdio.h>
        #include <stdlib.h>

        ${userCode}

        int main() {
            int nums[1000], n = 0, target;
            while (scanf("%d", &nums[n]) == 1) {
                if (getchar() == '\\n') break;
                n++;
            }
            n++;
            scanf("%d", &target);

            int returnSize;
            int* result = ${functionName}(nums, n, target, &returnSize);
            
            // ✅ Format as [3, 4]
            printf("[");
            for (int i = 0; i < returnSize; ++i) {
                if (i > 0) printf(", ");
                printf("%d", result[i]);
            }
            printf("]\\n");

            free(result);
            return 0;
        }
    `.trim();
}

export function wrapTwoSumGoCode(userCode: string, lang: string = "go"): string {
    const functionName = getFunctionName(lang);
    return `
    package main

    import (
        "fmt"
        "bufio"
        "os"
        "strconv"
        "strings"
        "sort" // Added for sort.Ints (sorting-based approach)
    )

    ${userCode}

    func main() {
        reader := bufio.NewReader(os.Stdin)

        line1, _ := reader.ReadString('\\n')
        nums := []int{}
        for _, part := range strings.Fields(line1) {
            num, _ := strconv.Atoi(part)
            nums = append(nums, num)
        }

        line2, _ := reader.ReadString('\\n')
        target, _ := strconv.Atoi(strings.TrimSpace(line2))

        result := ${functionName}(nums, target)

        // Format output as [3, 4] instead of [3,4]
        fmt.Print("[")
        for i, val := range result {
            if i > 0 {
                fmt.Print(", ")
            }
            fmt.Print(val)
        }
        fmt.Println("]")
    }
  `.trim();
}

export function wrapTwoSumRubyCode(userCode: string, lang: string = "ruby"): string {
    const functionName = getFunctionName(lang);
    return `
        ${userCode}

        nums = gets.strip.split.map(&:to_i)
        target = gets.strip.to_i
        result = ${functionName}(nums, target)
        puts result.inspect
    `.trim();
}

export function wrapTwoSumRustCode(userCode: string, lang: string = "rust"): string {
    const functionName = getFunctionName(lang);
    return `
        use std::io::{self, BufRead};
        use std::collections::HashMap;

        ${userCode}

        fn main() {
            let stdin = io::stdin();
            let mut lines = stdin.lock().lines();

            let nums: Vec<i32> = lines.next().unwrap().unwrap()
                .split_whitespace()
                .map(|x| x.parse().unwrap())
                .collect();

            let target: i32 = lines.next().unwrap().unwrap().parse().unwrap();

            let result = ${functionName}(nums, target);
            println!("{:?}", result);
        }
    `.trim();
}

export function wrapTwoSumKotlinCode(userCode: string, lang: string = "kotlin"): string {
    const functionName = getFunctionName(lang);
    return `
        import java.util.*
        import kotlin.collections.*

        ${userCode}

        fun main() {
            val nums = readLine()!!.split(" ").map { it.toInt() }.toIntArray()
            val target = readLine()!!.toInt()

            val result = ${functionName}(nums, target)
            println(result.joinToString(prefix = "[", postfix = "]", separator = ", "))
        }
    `.trim();
}

export function wrapTwoSumSwiftCode(userCode: string, lang: string = "swift"): string {
    const functionName = getFunctionName(lang);
    return `
        import Foundation

        ${userCode}

        let nums = readLine()!.split(separator: " ").map { Int($0)! }
        let target = Int(readLine()!)!
        let result = ${functionName}(nums, target)
        print(result)
    `.trim();
}

export function wrapTwoSumPerlCode(userCode: string, lang: string = "perl"): string {
    const functionName = getFunctionName(lang);
    return `
        ${userCode}

        my $line = <STDIN>;
        chomp $line;
        my @nums = split(' ', $line);
        chomp(my $target = <STDIN>);

        my @result = ${functionName}(\\@nums, $target);
        print join(' ', @result), "\\n";
    `.trim();
}

export function wrapTwoSumScalaCode(userCode: string, lang: string = "scala"): string {
    const functionName = getFunctionName(lang);
    return `
import scala.io.StdIn._
import scala.collection.mutable // Added for mutable.HashMap (optimal approach)

${userCode}

object Main extends App {
  val nums = readLine().split(" ").map(_.toInt)
  val target = readLine().toInt

  val result = ${functionName}(nums, target)
  println(result.mkString("[", ", ", "]"))
}
  `.trim();
}

export function wrapTwoSumHaskellCode(userCode: string, lang: string = "haskell"): string {
  const functionName = getFunctionName(lang);
  return `
import Data.List
import Control.Monad
import qualified Data.Map as Map

${userCode}

main = do
    nums <- fmap (map read . words) getLine
    target <- fmap read getLine
    let result = ${functionName} nums target
    putStrLn ("[" ++ intercalate ", " (map show result) ++ "]")
  `.trim();
}

export function wrapTwoSumRCode(userCode: string, lang: string = "r"): string {
    const functionName = getFunctionName(lang);
    return `
        ${userCode}

        nums <- as.integer(unlist(strsplit(readLines("stdin", n = 1), " ")))
        target <- as.integer(readLines("stdin", n = 1))
        result <- ${functionName}(nums, target)
        print(result)
    `.trim();
}

export function wrapTwoSumDartCode(userCode: string, lang: string = "dart"): string {
    const functionName = getFunctionName(lang);
    return `
        import 'dart:io';

        ${userCode}

        void main() {
            List<int> nums = stdin.readLineSync()!.split(' ').map(int.parse).toList();
            int target = int.parse(stdin.readLineSync()!);

            var result = ${functionName}(nums, target);
            print(result);
        }
    `.trim();
}

export function wrapTwoSumElixirCode(userCode: string, lang: string = "elixir"): string {
    const functionName = getFunctionName(lang);
    return `
        ${userCode}

        [line1, line2] = IO.stream(:stdio, :line) |> Enum.take(2)
        nums = String.trim(line1) |> String.split(" ") |> Enum.map(&String.to_integer/1)
        target = String.trim(line2) |> String.to_integer()

        result = Solution.${functionName}(nums, target)
        IO.inspect(result)
    `.trim();
}

export function wrapTwoSumCSharpCode(userCode: string, lang: string = "csharp"): string {
    const functionName = getFunctionName(lang);
    return `
        using System;
        using System.Linq; // Added for LINQ and array operations (sorting-based approach)

        public class Solution {
            ${userCode}

            public static void Main() {
                string[] input = Console.ReadLine().Split(' ');
                int[] nums = Array.ConvertAll(input, int.Parse);
                int target = int.Parse(Console.ReadLine());

                int[] result = ${functionName}(nums, target);
                Console.WriteLine("[" + string.Join(", ", result) + "]");
            }
        }
    `.trim();
}