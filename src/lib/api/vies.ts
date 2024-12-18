import { ViesResponse } from './types';

const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // Use the deployment URL in production
    return '';  // Empty string means use relative URLs which will work with Vercel's routing
  }
  // Use localhost in development
  return 'http://localhost:3000';
};

export const verifyEuVat = async (countryCode: string, vatNumber: string): Promise<ViesResponse> => {
  try {
    const cleanVat = vatNumber.replace(/[^a-zA-Z0-9]/g, '');
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/vat/${countryCode}/${cleanVat}`;
    
    console.log('Making VAT verification request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      let errorMessage = 'Failed to verify VAT number';
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        try {
          const errorData = await response.json();
          console.error('Error response data:', errorData);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          errorMessage = response.statusText || errorMessage;
        }
      } else {
        const textResponse = await response.text();
        console.error('Non-JSON error response:', textResponse);
        throw new Error(`Server returned non-JSON response: ${textResponse.substring(0, 100)}...`);
      }
      
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const textResponse = await response.text();
      console.error('Invalid content type:', contentType);
      console.error('Response body:', textResponse);
      throw new Error(`Invalid response format from server (${contentType}): ${textResponse.substring(0, 100)}...`);
    }

    const data = await response.json();
    console.log('VIES Response data:', data);

    // Check if we have a valid response structure
    if (typeof data.valid !== 'boolean') {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response format from VIES service');
    }

    return {
      valid: data.valid,
      countryCode: countryCode,
      vatNumber: cleanVat,
      requestDate: data.requestDate || new Date().toISOString(),
      name: data.traderName || undefined,
      address: data.traderAddress || undefined,
      userError: data.userError || undefined
    };
  } catch (error) {
    console.error('VAT verification error:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack
      } : error
    });
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('An unexpected error occurred while verifying the VAT number');
  }
};
