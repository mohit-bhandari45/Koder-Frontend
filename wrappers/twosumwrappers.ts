import { indent } from "@/utils/helper";

export function wrapTwoSumJavaCode(userCode: string, functionName: string): string {
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

export function wrapTwoSumJavaScriptCode(userCode: string, functionName: string): string {
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


export function wrapTwoSumPythonCode(userCode: string, functionName: string = "twoSum"): string {
    return [
        userCode.trim(), // leave user code as-is
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

export function wrapTwoSumCppCode(userCode: string, functionName: string): string {
    return `
        #include <iostream>
        #include <vector>
        #include <sstream>
        #include <string>
        #include <unordered_map>
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

export function wrapTwoSumCCode(userCode: string, functionName: string): string {
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
            for (int i = 0; i < returnSize; ++i) {
                if (i > 0) printf(" ");
                printf("%d", result[i]);
            }
            printf("\\n");
            free(result);
            return 0;
        }
    `.trim();
}

export function wrapTwoSumGoCode(userCode: string, functionName: string): string {
  return `
    package main

    import (
        "fmt"
        "bufio"
        "os"
        "strconv"
        "strings"
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

export function wrapTwoSumRubyCode(userCode: string, functionName: string): string {
    return `
        ${userCode}

        nums = gets.strip.split.map(&:to_i)
        target = gets.strip.to_i
        result = ${functionName}(nums, target)
        puts result.inspect
    `.trim();
}

export function wrapTwoSumRustCode(userCode: string, functionName: string): string {
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

export function wrapTwoSumKotlinCode(userCode: string, functionName: string): string {
    return `
        import java.util.*

        ${userCode}

        fun main() {
            val nums = readLine()!!.split(" ").map { it.toInt() }.toIntArray()
            val target = readLine()!!.toInt()

            val result = ${functionName}(nums, target)
            println(result.joinToString(" "))
        }
    `.trim();
}

export function wrapTwoSumSwiftCode(userCode: string, functionName: string): string {
    return `
        import Foundation

        ${userCode}

        let nums = readLine()!.split(separator: " ").map { Int($0)! }
        let target = Int(readLine()!)!
        let result = ${functionName}(nums, target)
        print(result)
    `.trim();
}

export function wrapTwoSumPerlCode(userCode: string, functionName: string): string {
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

export function wrapTwoSumScalaCode(userCode: string, functionName: string): string {
    return `
        import scala.io.StdIn._

        ${userCode}

        object Main extends App {
            val nums = readLine().split(" ").map(_.toInt)
            val target = readLine().toInt

            val result = ${functionName}(nums, target)
            println(result.mkString(" "))
        }
    `.trim();
}

export function wrapTwoSumHaskellCode(userCode: string, functionName: string): string {
    return `
        import Data.List
        import Control.Monad

        ${userCode}

        main = do
            nums <- fmap (map read . words) getLine
            target <- fmap read getLine
            let result = ${functionName} nums target
            print result
    `.trim();
}

export function wrapTwoSumRCode(userCode: string, functionName: string): string {
    return `
        ${userCode}

        nums <- as.integer(unlist(strsplit(readLines("stdin", n = 1), " ")))
        target <- as.integer(readLines("stdin", n = 1))
        result <- ${functionName}(nums, target)
        print(result)
    `.trim();
}

export function wrapTwoSumDartCode(userCode: string, functionName: string): string {
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

export function wrapTwoSumElixirCode(userCode: string, functionName: string): string {
    return `
        ${userCode}

        [line1, line2] = IO.stream(:stdio, :line) |> Enum.take(2)
        nums = String.trim(line1) |> String.split(" ") |> Enum.map(&String.to_integer/1)
        target = String.trim(line2) |> String.to_integer()

        result = ${functionName}(nums, target)
        IO.inspect(result)
    `.trim();
}