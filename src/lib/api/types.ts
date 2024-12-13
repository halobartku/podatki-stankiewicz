export interface EuCountry {
  code: string;
  name: string;
}

interface Representative {
  firstName: string;
  lastName: string;
}

interface StatusVatResult {
  status: string;
  result: boolean;
  message: string;
}

export interface PolishCompanyData {
  name: string;
  nip: string;
  statusVat: string;
  regon: string;
  krs?: string;
  pesel?: string;
  workingAddress: string;
  residenceAddress?: string;
  registrationLegalDate?: string;
  registrationDenialDate?: string;
  registrationDenialBasis?: string;
  restorationDate?: string;
  restorationBasis?: string;
  removalDate?: string;
  removalBasis?: string;
  accountNumbers: string[];
  hasVirtualAccounts?: boolean;
  representatives: Representative[];
  authorizedClerks: Representative[];
  partners: Representative[];
  ibans: string[];
  statusVatResult: StatusVatResult;
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
