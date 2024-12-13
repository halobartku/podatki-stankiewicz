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
    <div className="p-4">
      {/* Search Form */}
      <div className="mb-4 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-[#862B44]/10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-[#862B44]">
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
                    "block w-full rounded-lg border border-[#862B44]/10 bg-white/50",
                    "px-4 py-2.5 text-sm backdrop-blur-sm",
                    "focus:border-[#862B44] focus:ring-2 focus:ring-[#862B44]/20",
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
                <Globe className="w-5 h-5 text-[#862B44]/40 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label htmlFor="vatNumber" className="block text-sm font-medium text-[#862B44]">
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
                    "block w-full rounded-lg border border-[#862B44]/10 bg-white/50",
                    "px-4 py-2.5 text-sm backdrop-blur-sm",
                    "focus:border-[#862B44] focus:ring-2 focus:ring-[#862B44]/20",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "transition-colors duration-200",
                    "pr-12"
                  )}
                  placeholder="Wprowadź numer VAT"
                  disabled={loading}
                />
                <Search className="w-5 h-5 text-[#862B44]/40 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full rounded-lg",
              "bg-gradient-to-r from-[#862B44] via-[#A13553] to-[#DAA520]/40",
              "px-8 py-2.5 text-sm font-medium text-white",
              "transition-all",
              "hover:shadow-lg hover:shadow-[#DAA520]/20",
              "focus:outline-none focus:ring-2 focus:ring-[#862B44]/50",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Weryfikacja...' : 'Zweryfikuj numer VAT'}
          </motion.button>
        </form>
      </div>

      {error && (
        <div className="mb-4 flex items-start gap-3 p-3 rounded-xl border border-error-light/20 bg-error-light/10 backdrop-blur-sm text-error-dark">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-[#862B44]/10">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Company Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-[#862B44]/10">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-[#862B44] mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-medium text-[#862B44] text-sm mb-2">Dane firmy</h4>
                  {result.name ? (
                    <p className="text-[#862B44]/80 text-sm break-words">{result.name}</p>
                  ) : (
                    <p className="text-[#862B44]/60 italic text-sm">Nazwa niedostępna</p>
                  )}
                </div>
              </div>
            </div>

            {/* VAT Number */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-[#862B44]/10">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-[#862B44] mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-medium text-[#862B44] text-sm mb-2">Numer VAT</h4>
                  <p className="text-[#862B44]/80 text-sm font-mono">{result.countryCode} {result.vatNumber}</p>
                </div>
              </div>
            </div>

            {/* Verification Date */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-[#862B44]/10">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#862B44] mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-medium text-[#862B44] text-sm mb-2">Data weryfikacji</h4>
                  <p className="text-[#862B44]/80 text-sm">
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
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-[#862B44]/10">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#862B44] mt-1 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-medium text-[#862B44] text-sm mb-2">Adres</h4>
                  <p className="text-[#862B44]/80 text-sm break-words">{result.address}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
