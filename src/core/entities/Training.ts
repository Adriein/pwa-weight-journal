import TraningLog from "./TraningLog";

export interface Training {
  id: string;
  rutineId: string;
  userId: string;
  logs: TraningLog[]
  creationDate: Date;
}
