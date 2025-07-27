import { languageOptions } from "@/config/languageOptions";
import { themeOptions } from "@/config/theme";
import { useCodeEditor } from "@/context/CodeEditorContext";
import { useCodeRunner } from "@/context/CodeRunnerContext";
import { defaultComments } from "@/templates/defaultdata";
import CodeEditor from "./CodeEditor";

const Editor = ({ mode }: { mode: "practice" | "testcase" }) => {
  const { clearOutput } = useCodeRunner();
  const {
    setPracticeCode,
    setTestcaseCode,
    language,
    setLanguage,
    fontSize,
    setFontSize,
    theme,
    setTheme,
    problem
  } = useCodeEditor();

  const changeLang = (e: { target: { value: string } }) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);

    if (mode === "practice") {
      clearOutput();
      setPracticeCode(defaultComments[selectedLang]);
    } else {
      setTestcaseCode(problem?.starterCode[language] ?? "");
    }
  };

  return (
    <div className="flex-1 min-w-0 h-full flex flex-col">
      {/* Controls Panel */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 flex-shrink-0">
        {/* Mobile Layout - Vertical Stack */}
        <div className="flex flex-col gap-3 sm:hidden">
          {/* First Row - Language */}
          <div className="flex items-center gap-2">
            <label className="text-slate-300 font-medium text-xs min-w-[60px]">
              Language:
            </label>
            <select
              value={language}
              onChange={changeLang}
              className="bg-slate-700 cursor-pointer text-white border border-slate-600 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
            >
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Second Row - Font Size and Theme */}
          <div className="flex gap-3">
            <div className="flex items-center gap-2 flex-1">
              <label className="text-slate-300 font-medium text-xs min-w-[50px]">
                Size:
              </label>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="bg-slate-700 text-white border cursor-pointer border-slate-600 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
              >
                {[12, 14, 16, 18, 20, 24, 28, 32].map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 flex-1">
              <label className="text-slate-300 font-medium text-xs min-w-[40px]">
                Theme:
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-slate-700 text-white border cursoder-pointer border-slate-600 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
              >
                {themeOptions.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tablet Layout - 2x2 Grid */}
        <div className="hidden sm:grid md:hidden grid-cols-2 gap-3">
          {/* Language selector */}
          <div className="flex items-center gap-2">
            <label className="text-slate-300 font-medium text-sm min-w-[70px]">
              Language:
            </label>
            <select
              value={language}
              onChange={changeLang}
              className="bg-slate-700 cursor-pointer text-white border border-slate-600 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
            >
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font size selector */}
          <div className="flex items-center gap-2">
            <label className="text-slate-300 font-medium text-sm min-w-[70px]">
              Font Size:
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="bg-slate-700 text-white border cursor-pointer border-slate-600 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
            >
              {[12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map((size) => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
          </div>

          {/* Theme selector - spans both columns */}
          <div className="col-span-2 flex items-center gap-2">
            <label className="text-slate-300 font-medium text-sm min-w-[50px]">
              Theme:
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-slate-700 text-white border cursor-pointer border-slate-600 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 max-w-[200px]"
            >
              {themeOptions.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Layout - Horizontal */}
        <div className="hidden md:flex flex-wrap items-center gap-4 lg:gap-6">
          {/* Language selector */}
          <div className="flex items-center gap-2">
            <label className="text-slate-300 font-medium text-sm">
              Language:
            </label>
            <select
              value={language}
              onChange={changeLang}
              className="bg-slate-700 cursor-pointer text-white border border-slate-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[120px]"
            >
              {languageOptions.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font size selector */}
          <div className="flex items-center gap-2">
            <label className="text-slate-300 font-medium text-sm">
              Font Size:
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="bg-slate-700 text-white border cursor-pointer border-slate-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[80px]"
            >
              {[12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map((size) => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
          </div>

          {/* Theme selector */}
          <div className="flex items-center gap-2">
            <label className="text-slate-300 font-medium text-sm">Theme:</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-slate-700 text-white border cursor-pointer border-slate-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"
            >
              {themeOptions.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="bg-slate-800/50 flex-1 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden shadow-2xl min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]">
        <CodeEditor mode={mode} />
      </div>
    </div>
  );
};

export default Editor;
