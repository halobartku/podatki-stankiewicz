import { useState } from 'react';
import { verifyEuVat } from '../../lib/api/vies';
import type { EuCountry, ViesResponse } from '../../lib/api/types';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const EU_COUNTRIES: EuCountry[] = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgia' },
  { code: 'BG', name: 'Bułgaria' },
  { code: 'HR', name: 'Chorwacja' },
  { code: 'CY', name: 'Cypr' },
  { code: 'CZ', name: 'Czechy' },
  { code: 'DK', name: 'Dania' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finlandia' },
  { code: 'FR', name: 'Francja' },
  { code: 'DE', name: 'Niemcy' },
  { code: 'GR', name: 'Grecja' },
  { code: 'HU', name: 'Węgry' },
  { code: 'IE', name: 'Irlandia' },
  { code: 'IT', name: 'Włochy' },
  { code: 'LV', name: 'Łotwa' },
  { code: 'LT', name: 'Litwa' },
  { code: 'LU', name: 'Luksemburg' },
  { code: 'MT', name: 'Malta' },
  { code: 'NL', name: 'Holandia' },
  { code: 'PL', name: 'Polska' },
  { code: 'PT', name: 'Portugalia' },
  { code: 'RO', name: 'Rumunia' },
  { code: 'SK', name: 'Słowacja' },
  { code: 'SI', name: 'Słowenia' },
  { code: 'ES', name: 'Hiszpania' },
  { code: 'SE', name: 'Szwecja' }
];

export default function EuVat() {
  const [country, setCountry] = useState<string>('');
  const [vatNumber, setVatNumber] = useState('');
  const [result, setResult] = useState<ViesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError(null);
    setResult(null);

    if (!country) {
      setError('Proszę wybrać kraj');
      return;
    }
    if (!vatNumber) {
      setError('Proszę wprowadzić numer VAT');
      return;
    }

    setLoading(true);

    try {
      const data = await verifyEuVat(country, vatNumber);
      setResult(data);
      setError(null);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-gray-50/50 backdrop-blur-sm rounded-lg border border-white/10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-800">
            Kraj
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setResult(null);
              setError(null);
            }}
            className={cn(
              "mt-1 block w-full rounded-md border border-white/10 bg-white/5",
              "px-3 py-2 text-sm backdrop-blur-sm",
              "focus:border-white focus:ring-2 focus:ring-white/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-colors duration-200"
            )}
            disabled={loading}
          >
            <option value="">Wybierz kraj</option>
            {EU_COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-800">
            Numer VAT
          </label>
          <input
            type="text"
            id="vatNumber"
            value={vatNumber}
            onChange={(e) => {
              setVatNumber(e.target.value);
              setResult(null);
              setError(null);
            }}
            className={cn(
              "mt-1 block w-full rounded-md border border-white/10 bg-white/5",
              "px-3 py-2 text-sm backdrop-blur-sm",
              "focus:border-white focus:ring-2 focus:ring-white/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-colors duration-200"
            )}
            placeholder="Wprowadź numer VAT"
            disabled={loading}
          />
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          className={cn(
            "w-full rounded-lg",
            "bg-gradient-to-r from-[#862B44] via-[#A13553] to-[#DAA520]/40",
            "px-8 py-3 text-sm font-medium text-white",
            "transition-all",
            "hover:shadow-lg hover:shadow-[#DAA520]/20",
            "focus:outline-none focus:ring-2 focus:ring-[#862B44]/50",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? 'Weryfikacja...' : 'Zweryfikuj numer VAT'}
        </motion.button>
      </form>

      {error && (
        <div className={cn(
          "p-4 rounded-lg",
          "border border-error-light/20",
          "bg-error-light/10 backdrop-blur-sm",
          "text-error-dark text-sm"
        )}>
          {error}
        </div>
      )}

      {result && (
        <div className={cn(
          "p-4 rounded-lg border backdrop-blur-sm",
          result.valid 
            ? "border-success-light/20 bg-success-light/10" 
            : "border-warning-light/20 bg-warning-light/10"
        )}>
          <div className={cn(
            "text-lg font-medium mb-3",
            result.valid ? "text-success-dark" : "text-warning-dark"
          )}>
            {result.valid ? 'Prawidłowy numer VAT' : 'Nieprawidłowy numer VAT'}
          </div>
          <dl className="space-y-2 text-sm text-gray-700">
            <div className="flex">
              <dt className="w-32 font-medium">Numer VAT:</dt>
              <dd>{result.countryCode} {result.vatNumber}</dd>
            </div>
            <div className="flex">
              <dt className="w-32 font-medium">Zweryfikowano:</dt>
              <dd>
                {new Date(result.requestDate).toLocaleDateString('pl-PL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </dd>
            </div>
            {result.name && (
              <div className="flex">
                <dt className="w-32 font-medium">Firma:</dt>
                <dd>{result.name}</dd>
              </div>
            )}
            {result.address && (
              <div className="flex">
                <dt className="w-32 font-medium">Adres:</dt>
                <dd>{result.address}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}
