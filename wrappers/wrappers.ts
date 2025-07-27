import { indent } from "@/utils/helper";

export function wrapJavaCode(userCode: string, functionName: string): string {
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
                    int target = Integer.parseInt(sc.nextLine);

                    int[] result = ${functionName}(nums, target);
                    System.out.println(Arrays.toString(result));
                }
            }
        `.trim();
}

export function wrapJavaScriptCode(userCode: string, functionName: string): string {
  return `
        ${userCode}

        // Input parsing and function calling
        const fs = require('fs');
        const input = fs.readFileSync(0, 'utf-8').split('\\n');

        const nums = input[0].split(" ").map(Number);
        const target = parseInt(input[1]);

        const result = ${functionName}(nums, target);
        console.log(JSON.stringify(result));
    `.trim();
}

export function wrapPythonCode(userCode: string, functionName: string = "twoSum"): string {
  return `
        ${userCode}

        import sys
        lines = sys.stdin.read().splitlines()

        nums = list(map(int, lines[0].split()))
        target = int(lines[1])

        result = ${functionName}(nums, target)
        print(result)
    `.trim();
}