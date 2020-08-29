import TraningLog from "./TraningLog";

export interface Training {
  id: string;
  name?: string;
  userId: string;
  logs: TraningLog[]
  date: Date;
  creationDate: Date;
}
