import { IProblem } from '@/types/problem'
import React from 'react'

const Description = ({ problem }: { problem: IProblem }) => {
  return (
    <>
     <div className="prose prose-invert bg-[#23232a] p-6 rounded-lg border border-gray-800 mb-4">
            <h2>Description</h2>
            <p>{problem.description}</p>
          </div>
          {/* Constraints */}
          {problem.constraints && problem.constraints.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-1">Constraints</h3>
              <ul className="list-disc list-inside text-sm text-gray-300">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
    </>
  )
}

export default Description