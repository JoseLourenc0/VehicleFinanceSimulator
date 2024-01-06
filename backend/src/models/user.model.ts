export interface User {
  id: number;
  username: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
