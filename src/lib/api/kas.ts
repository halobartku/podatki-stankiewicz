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
    console.log('API Response:', subject); // Debug log
    
    // Helper function to format address
    const formatAddress = (address: any) => {
      if (!address) return 'Adres niedostępny';
      
      const parts = [];
      if (address.street) parts.push(address.street);
      if (address.number) parts.push(address.number);
      if (address.postalCode) parts.push(address.postalCode);
      if (address.city) parts.push(address.city);
      
      console.log('Formatting address:', address, 'Result:', parts.join(' ')); // Debug log
      return parts.length > 0 ? parts.join(' ') : 'Adres niedostępny';
    };

    // Helper function to format person name
    const formatPerson = (person: any) => {
      if (!person) return undefined;
      return {
        firstName: person.firstName || person.companyName || '',
        lastName: person.lastName || ''
      };
    };

    // Get all available data
    const result: PolishCompanyData = {
      name: subject.name,
      nip: subject.nip,
      statusVat: subject.statusVat,
      regon: subject.regon,
      krs: subject.krs,
      pesel: subject.pesel,
      workingAddress: formatAddress(subject.workingAddress),
      residenceAddress: formatAddress(subject.residenceAddress),
      registrationLegalDate: subject.registrationLegalDate,
      registrationDenialDate: subject.registrationDenialDate,
      registrationDenialBasis: subject.registrationDenialBasis,
      restorationDate: subject.restorationDate,
      restorationBasis: subject.restorationBasis,
      removalDate: subject.removalDate,
      removalBasis: subject.removalBasis,
      accountNumbers: subject.accountNumbers || [],
      hasVirtualAccounts: subject.hasVirtualAccounts,
      representatives: subject.representatives?.map(formatPerson) || [],
      authorizedClerks: subject.authorizedClerks?.map(formatPerson) || [],
      partners: subject.partners?.map(formatPerson) || [],
      ibans: subject.ibans || [],
      statusVatResult: {
        status: subject.statusVat || 'Brak informacji',
        result: true,
        message: ''
      }
    };

    // Add additional status information
    if (subject.statusVat === 'Czynny') {
      result.statusVatResult.message = 'Podmiot jest zarejestrowany jako podatnik VAT czynny';
    } else if (subject.statusVat === 'Zwolniony') {
      result.statusVatResult.message = 'Podmiot jest zarejestrowany jako podatnik VAT zwolniony';
    } else {
      result.statusVatResult.result = false;
      result.statusVatResult.message = 'Podmiot nie jest zarejestrowany jako podatnik VAT';
    }

    console.log('Processed result:', result); // Debug log
    return result;
  } catch (error) {
    console.error('API Error:', error); // Debug log
    if (error instanceof Error) {
      if (error.message === 'Nie znaleziono firmy') {
        throw error;
      }
      throw new Error('Wystąpił błąd podczas weryfikacji');
    }
    throw new Error('Wystąpił nieoczekiwany błąd');
  }
};
