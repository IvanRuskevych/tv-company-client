export interface ICustomer {
  _id?: string;
  name: string;
  phone: string;
  contactPerson: string;
  bankDetails: IBankDetails;
}

export interface IBankDetails {
  bankName: string;
  identifierTIN: number;
  iban: string;
}
