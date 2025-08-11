
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
    easy:number;
    medium:number;
    hard:number
  }
}

type LanguageType = {
  [languages:string]: Language[]; 
}

type SkillsByLevel = {
  [level: string]: Skill[];
};

type DashboardState = {
  progress: ProgressType;
  languages: LanguageType;
  skills: SkillsByLevel;
  submissions: any;
};

export default DashboardState;
