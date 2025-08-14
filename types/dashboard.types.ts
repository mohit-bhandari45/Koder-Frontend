
type Skill = {
  skill: string;
  count: number;
};

type Language = {
  language: string;
  count: number;
}

type ProgressType = {
  totalProblems: number;
  totalSolved: number;
  acceptanceRate: number;
  byDifficulty:{
    easy:{solved:number,total:number};
    medium:{solved:number,total:number};
    hard:{solved:number,total:number};
  }
}

type ProblemType = {
  title:string;
  _id:string;
  difficulty:string;
}

type SubmissionType = {
    _id: string;
    title?:string;
    userId: string;
    problemId: ProblemType;
    code: string;
    language: string;
    status: "Pending" | "Accepted" | "Rejected";
    runtime?: number;
    memory?: number;
    createdAt: Date;
    updatedAt: Date;
}

type SkillsByLevel = {
  [level: string]: Skill[];
};

type DashboardState = {
  progress: ProgressType;
  languages: Language[];
  skills: SkillsByLevel;
  submissions: SubmissionType[];
};

export default DashboardState;
