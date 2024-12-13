export interface EuCountry {
  code: string;
  name: string;
}

interface Representative {
  firstName: string;
  lastName: string;
}

export interface PolishCompanyData {
  name: string;
  nip: string;
  statusVat: string;
  regon: string;
  workingAddress: string;
  residenceAddress?: string;
  registrationLegalDate?: string;
  krs?: string;
  accountNumbers?: string[];
  representatives?: Representative[];
  authorizedClerks?: Representative[];
  partners?: Representative[];
}

export interface ViesResponse {
  valid: boolean;
  countryCode: string;
  vatNumber: string;
  requestDate: string;
  name?: string;
  address?: string;
  userError?: string;
}
