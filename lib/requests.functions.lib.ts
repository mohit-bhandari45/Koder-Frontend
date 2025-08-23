import api, { ADD_SUBMISSION_ENDPOINT, BASE_URL, GET_ALL_PROBLEM_SUBMISSION_ENDPOINT, PROBLEM_BASE } from "./api.lib";

/* Utility Functions */
const getProblems = async (page = 1) => {
    const res = await api.get(`${PROBLEM_BASE}?page=${page}`);
    return res.data.data;
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
    runtime: number,
    memory: number,
}) => {
    try {
        const res = await api.post(ADD_SUBMISSION_ENDPOINT, payload);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const getSubmissionsByProblem = async (problemId: string) => {
    const res = await api.get(`${GET_ALL_PROBLEM_SUBMISSION_ENDPOINT}/${problemId}/all`);
    return res.data.data;
};

const searchProblems = async (query: string, page: number = 1) => {
    const res = await api.get(`${BASE_URL}/api/search?q=${encodeURIComponent(query)}&page=${page}&limit=30`);
    return res.data;
}


export { getProblems, getProblemById, addSubmission, getSubmissionsByProblem, searchProblems };