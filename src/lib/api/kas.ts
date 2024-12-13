import { PolishCompanyData } from './types';

export const verifyCompany = async (nip: string): Promise<PolishCompanyData> => {
  try {
    const response = await fetch(
      `https://wl-api.mf.gov.pl/api/search/nip/${nip}?date=${new Date().toISOString().split('T')[0]}`
    );
    
    if (!response.ok) {
      throw new Error('Nie udało się zweryfikować firmy');
    }

    const data = await response.json();
    
    if (!data.result.subject) {
      throw new Error('Nie znaleziono firmy');
    }

    const subject = data.result.subject;
    
    // Helper function to format address
    const formatAddress = (address: any) => {
      if (!address) return undefined;
      const parts = [
        address.street,
        address.number,
        address.postalCode,
        address.city
      ].filter(Boolean);
      return parts.join(' ');
    };

    // Helper function to format person name
    const formatPerson = (person: any) => {
      if (!person) return undefined;
      return {
        firstName: person.firstName || person.companyName || '',
        lastName: person.lastName || ''
      };
    };

    return {
      name: subject.name,
      nip: subject.nip,
      statusVat: subject.statusVat,
      regon: subject.regon,
      krs: subject.krs,
      workingAddress: formatAddress(subject.workingAddress) || 'Adres niedostępny',
      residenceAddress: formatAddress(subject.residenceAddress),
      registrationLegalDate: subject.registrationLegalDate,
      accountNumbers: subject.accountNumbers,
      representatives: subject.representatives?.map(formatPerson),
      authorizedClerks: subject.authorizedClerks?.map(formatPerson),
      partners: subject.partners?.map(formatPerson)
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Nie znaleziono firmy') {
        throw error;
      }
      console.error('API Error:', error);
      throw new Error('Wystąpił błąd podczas weryfikacji');
    }
    throw new Error('Wystąpił nieoczekiwany błąd');
  }
};
