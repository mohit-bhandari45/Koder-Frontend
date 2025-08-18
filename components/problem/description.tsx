import { IProblem } from "@/types/problem.types";
import React from "react";

const Description = ({ problem }: { problem: IProblem }) => {
  return (
      <div className="prose prose-invert bg-[#23232a] p-6 rounded-lg border border-gray-800 mb-4">
        <h2>Description</h2>
        <p>{problem.description}</p>
      </div>
  );
};

export default Description;
