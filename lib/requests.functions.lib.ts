import api, { ADD_SUBMISSION_ENDPOINT, GET_ALL_PROBLEM_SUBMISSION_ENDPOINT, PROBLEM_BASE } from "./api.lib";

/* Utility Functions */
const getProblems = async (page = 1) => {
    const res = await api.get(`${PROBLEM_BASE}?page=${page}`);
    return res.data;
};

const getProblemById = async (id: string) => {
    const res = await api.get(`${PROBLEM_BASE}/${id}`);
    return res.data;
};

const addSubmission = async (payload: {
    problemId: string;
    code: string;
    language: string;
    status: "Accepted" | "Rejected" | "Pending",
    // runtime: string,
    // memory: string,
}) => {
    const res = await api.post(ADD_SUBMISSION_ENDPOINT, payload);
    return res.data;
};

const getSubmissionsByProblem = async (problemId: string) => {
    const res = await api.get(`${GET_ALL_PROBLEM_SUBMISSION_ENDPOINT}/${problemId}/all`);
    return res.data;
};

export { getProblems, getProblemById, addSubmission, getSubmissionsByProblem };