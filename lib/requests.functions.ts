import api, { ADD_SUBMISSION_ENDPOINT, PROBLEM_BASE } from "./api";

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
    testcaseCode: string;
    language: string;
    status: "Accepted" | "Rejected" | "Pending"
}) => {
    const res = await api.post(ADD_SUBMISSION_ENDPOINT, payload);
    return res.data;
};

export { getProblems, getProblemById, addSubmission };