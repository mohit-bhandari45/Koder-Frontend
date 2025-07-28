import {
    wrapTwoSumJavaCode,
    wrapTwoSumJavaScriptCode,
    wrapTwoSumPythonCode,
    wrapTwoSumCppCode,
    wrapTwoSumCCode,
    wrapTwoSumGoCode,
    wrapTwoSumRubyCode,
    wrapTwoSumRustCode,
    wrapTwoSumKotlinCode,
    wrapTwoSumSwiftCode,
    wrapTwoSumPerlCode,
    wrapTwoSumScalaCode,
    wrapTwoSumHaskellCode,
    wrapTwoSumRCode,
    wrapTwoSumDartCode,
    wrapTwoSumElixirCode
} from "./twosumwrappers";

export const problemWrapperMap: Record<
    string,
    Record<string, (userCode: string) => string>
> = {
    twoSum: {
        java: wrapTwoSumJavaCode,
        javascript: wrapTwoSumJavaScriptCode,
        python3: wrapTwoSumPythonCode,
        cpp: wrapTwoSumCppCode,
        c: wrapTwoSumCCode,
        go: wrapTwoSumGoCode,
        ruby: wrapTwoSumRubyCode,
        rust: wrapTwoSumRustCode,
        kotlin: wrapTwoSumKotlinCode,
        swift: wrapTwoSumSwiftCode,
        perl: wrapTwoSumPerlCode,
        scala: wrapTwoSumScalaCode,
        haskell: wrapTwoSumHaskellCode,
        r: wrapTwoSumRCode, // not working 
        dart: wrapTwoSumDartCode,
        elixir: wrapTwoSumElixirCode,
    },
};
