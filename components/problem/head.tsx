import { IProblem } from "@/types/problem.types";
import React from "react";

const Head = ({ problem }: { problem: IProblem }) => {
  return (
    <>
      <h1 className="text-3xl font-bold mt-4 mb-2">{problem.title}</h1>
      <div className="mb-4">
        <span className="px-3 py-1 border rounded-full text-xs font-bold mr-2 bg-[#23232a] border-gray-700">
          {problem.difficulty}
        </span>
        {problem.tags && problem.tags.length > 0 && (
          <span className="text-indigo-200 text-xs">
            {problem.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-[#31314a] px-2 py-0.5 rounded-full border border-indigo-400/20 mr-1"
              >
                {tag}
              </span>
            ))}
          </span>
        )}
      </div>
    </>
  );
};

export default Head;
