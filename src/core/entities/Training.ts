import TraningLog from "./TraningLog";

export interface Training {
  id: string;
  rutineId: string;
  logs: TraningLog[]
  creationDate: Date;
}
