export interface ICommercial {
  _id?: string;
  name: string;
  duration: number;
  date: {
    start: Date;
    end: Date;
  };
  show: string;
  customer: string;
  agent: string;
}
