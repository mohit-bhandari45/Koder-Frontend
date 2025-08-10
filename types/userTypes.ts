// Interface for User document
type User =  {
    _id: string;
    fullName: string;
    username: string;
    email: string;
    password: string;
    profilepicture?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export default User;

  type DashboardState = {
  progress: any;
  languages: any;
  skills: any;
  submissions: any;
};

export type {DashboardState};