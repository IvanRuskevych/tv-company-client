export interface IAgent {
  _id?: string;
  name: string;
  commission: number;
}

export interface IAgentsResponse {
  data: IAgent[];
  message?: string;
}
