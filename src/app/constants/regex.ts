export const regex = {
  INTEGERS: '^[0-9]+$',
  PHONE: /^\+[0-9]+$/,
  EMPLOYEE_ID: /^\d{5}$/,
  TIN: /^\d{8}$|^\d{10}$/,
  IBAN: /^[A-Z0-9]{15,34}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/i,
};
