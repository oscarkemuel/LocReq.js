declare namespace Express {
  export interface Request {
    user: {
      id: string;
      name: string | null;
      email: string;
      isAdmin: boolean;
    };
  }
}