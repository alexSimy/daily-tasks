type User = {
  username: string;
  password: string;
};

type DBUser = { id: number } & User;

export type { User, DBUser };
