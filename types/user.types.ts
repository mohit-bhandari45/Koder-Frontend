// Interface for User document
type User = {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  isVerified: boolean
  password: string;
  profilepicture?: string;
  createdAt: Date;
  updatedAt: Date;
  location: string;
  institute: string;
  githubId: string;
};
export default User;
