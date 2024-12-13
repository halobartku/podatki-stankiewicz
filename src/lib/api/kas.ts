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
    console.log('Raw API Response:', JSON.stringify(data.result, null, 2));
    
    // Helper function to format address with support for different field structures
    const formatAddress = (address: any) => {
      console.log('Raw address data:', JSON.stringify(address, null, 2));
      
      if (!address) {
        console.log('Address is null/undefined');
        return 'Adres niedostępny';
      }
      
      // Check if address is a string (some APIs return full address as a string)
      if (typeof address === 'string') {
        return address;
      }
      
      const parts = [];
      
      // Support both camelCase and regular field names
      const street = address.street || address.ulica || address.streetName;
      const number = address.number || address.numer || address.streetNumber || address.numerBudynku;
      const postal = address.postalCode || address.kodPocztowy;
      const city = address.city || address.miasto || address.miejscowosc;
      
      console.log('Extracted fields:', { street, number, postal, city });
      
      if (street) parts.push(street);
      if (number) parts.push(number);
      if (postal) parts.push(postal);
      if (city) parts.push(city);
      
      // Check for direct address field
      if (parts.length === 0 && address.adres) {
        return address.adres;
      }
      
      console.log('Final address parts:', parts);
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

    console.log('Final processed result:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof Error) {
      if (error.message === 'Nie znaleziono firmy') {
        throw error;
      }
      throw new Error('Wystąpił błąd podczas weryfikacji');
    }
    throw new Error('Wystąpił nieoczekiwany błąd');
  }
};
