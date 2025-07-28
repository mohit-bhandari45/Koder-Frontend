export const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const result = await getSubmissionsByProblem(problemId);
        setSubmissions(result || []);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };