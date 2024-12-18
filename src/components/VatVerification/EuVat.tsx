import { useState } from 'react';
import { motion } from 'framer-motion';
import { verifyEuVat } from '../../lib/api/vies';
import type { EuCountry, ViesResponse } from '../../lib/api/types';
import { cn } from '../../lib/utils';
import { 
  Building, 
  Calendar, 
  MapPin, 
  Search,
  Globe,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';

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
    <div className="px-2 sm:px-4">
      {/* Search Form */}
      <div className="mb-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100 w-full max-w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-primary-500">
                Kraj
              </label>
              <div className="mt-1 relative">
                <select
                  id="country"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setResult(null);
                    setError(null);
                  }}
                  className={cn(
                    "block w-full rounded-lg border border-primary-100 bg-white/50",
                    "px-4 py-2.5 text-sm backdrop-blur-sm",
                    "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-colors duration-200",
                    "pr-12"
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
                <Globe className="w-5 h-5 text-primary-500/40 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label htmlFor="vatNumber" className="block text-sm font-medium text-primary-500">
                Numer VAT
              </label>
              <div className="mt-1 relative">
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
                    "block w-full rounded-lg border border-primary-100 bg-white/50",
                    "px-4 py-2.5 text-sm backdrop-blur-sm",
                    "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-colors duration-200",
                    "pr-12"
                  )}
                  placeholder="Wprowadź numer VAT"
                  disabled={loading}
                />
                <Search className="w-5 h-5 text-primary-500/40 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className="relative w-full rounded-lg px-8 py-2.5 text-sm font-medium text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 transition-all duration-300"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 transition-opacity duration-300"></div>
            <span className="relative z-10">{loading ? 'Weryfikacja...' : 'Zweryfikuj numer VAT'}</span>
            <div className="absolute inset-0 border border-white/10 rounded-lg shadow-lg"></div>
          </motion.button>
        </form>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-3 p-3 rounded-xl border border-error-light/20 bg-error-light/10 backdrop-blur-sm text-error-dark w-full max-w-full">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-4 w-full max-w-full">
          {/* Status */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100 w-full">
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                "text-sm font-medium",
                result.valid
                  ? "bg-success-light/10 text-success-dark"
                  : "bg-warning-light/10 text-warning-dark"
              )}>
                {result.valid ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                {result.valid ? 'Prawidłowy numer VAT' : 'Nieprawidłowy numer VAT'}
              </div>
            </div>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {/* Company Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100 w-full">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-medium text-primary-500 text-sm mb-2">Dane firmy</h4>
                  {result.name ? (
                    <p className="text-primary-500/80 text-sm break-words">{result.name}</p>
                  ) : (
                    <p className="text-primary-500/60 italic text-sm">Nazwa niedostępna</p>
                  )}
                </div>
              </div>
            </div>

            {/* VAT Number */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100 w-full">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-medium text-primary-500 text-sm mb-2">Numer VAT</h4>
                  <p className="text-primary-500/80 text-sm font-mono">{result.countryCode} {result.vatNumber}</p>
                </div>
              </div>
            </div>

            {/* Verification Date */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100 w-full">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-medium text-primary-500 text-sm mb-2">Data weryfikacji</h4>
                  <p className="text-primary-500/80 text-sm">
                    {new Date(result.requestDate).toLocaleDateString('pl-PL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          {result.address && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100 w-full">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-medium text-primary-500 text-sm mb-2">Adres</h4>
                  <p className="text-primary-500/80 text-sm break-words">{result.address}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
