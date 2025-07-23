// Interface for User document
type User =  {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
    profilepicture?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export default User;