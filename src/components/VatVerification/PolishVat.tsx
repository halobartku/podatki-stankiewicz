import { useState } from 'react';
import { motion } from 'framer-motion';
import { verifyCompany } from '../../lib/api/kas';
import type { PolishCompanyData } from '../../lib/api/types';
import { cn } from '../../lib/utils';
import { 
  Building, 
  Calendar, 
  CreditCard, 
  FileText, 
  MapPin, 
  Search,
  Users,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function PolishVat() {
  const [nip, setNip] = useState('');
  const [companyData, setCompanyData] = useState<PolishCompanyData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCompanyData(null);

    try {
      const data = await verifyCompany(nip);
      setCompanyData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4">
      {/* Search Form */}
      <div className="mb-4 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-primary-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nip" className="block text-sm font-medium text-primary-500">
              NIP
            </label>
            <div className="mt-1 relative">
              <input
                type="text"
                id="nip"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                className={cn(
                  "block w-full rounded-lg border border-primary-100 bg-white/50",
                  "px-4 py-2.5 text-sm backdrop-blur-sm",
                  "focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-colors duration-200",
                  "pr-12"
                )}
                placeholder="Wprowadź NIP"
                disabled={loading}
              />
              <Search className="w-5 h-5 text-primary-500/40 absolute right-3 top-1/2 transform -translate-y-1/2" />
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
            <span className="relative z-10">{loading ? 'Weryfikacja...' : 'Zweryfikuj NIP'}</span>
            <div className="absolute inset-0 border border-white/10 rounded-lg shadow-lg"></div>
          </motion.button>
        </form>
      </div>

      {/* Rest of the component remains unchanged */}
      {error && (
        <div className="mb-4 flex items-start gap-3 p-3 rounded-xl border border-error-light/20 bg-error-light/10 backdrop-blur-sm text-error-dark">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {companyData && (
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100">
            <div className="flex flex-col items-center gap-2">
              <div className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full",
                "text-sm font-medium",
                companyData.statusVat === "Czynny"
                  ? "bg-success-light/10 text-success-dark"
                  : "bg-warning-light/10 text-warning-dark"
              )}>
                {companyData.statusVat === "Czynny" ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                Status: {companyData.statusVat}
              </div>
              <p className="text-sm text-primary-500/80 text-center">
                {companyData.statusVatResult.message}
              </p>
            </div>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Company Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100">
              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div className="space-y-2 min-w-0">
                  <h3 className="text-base font-semibold text-primary-500 break-words">{companyData.name}</h3>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="font-medium text-primary-500">NIP: </span>
                      <span className="text-primary-500/80">{companyData.nip}</span>
                    </div>
                    <div>
                      <span className="font-medium text-primary-500">REGON: </span>
                      <span className="text-primary-500/80">{companyData.regon}</span>
                    </div>
                    {companyData.krs && (
                      <div>
                        <span className="font-medium text-primary-500">KRS: </span>
                        <span className="text-primary-500/80">{companyData.krs}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div className="space-y-2 min-w-0">
                  <div>
                    <h4 className="font-medium text-primary-500 text-sm">Adres:</h4>
                    <p className="text-primary-500/80 text-sm break-words">{companyData.workingAddress}</p>
                  </div>
                  {companyData.residenceAddress && companyData.residenceAddress !== companyData.workingAddress && (
                    <div>
                      <h4 className="font-medium text-primary-500 text-sm">Adres siedziby:</h4>
                      <p className="text-primary-500/80 text-sm break-words">{companyData.residenceAddress}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bank Accounts */}
            {(companyData.accountNumbers.length > 0 || companyData.ibans.length > 0) && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-primary-500 text-sm">Rachunki bankowe</h4>
                      {companyData.hasVirtualAccounts && (
                        <div className="flex items-center gap-1">
                          <Info className="w-4 h-4 text-primary-500/70" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-1">
                      {[...new Set([...companyData.accountNumbers, ...companyData.ibans])].map((account, index) => (
                        <div key={index} className="text-primary-500/80 text-sm font-mono break-all">
                          {account}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Registration Dates */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div className="space-y-2 min-w-0">
                  {companyData.registrationLegalDate && (
                    <div>
                      <h4 className="font-medium text-primary-500 text-sm">Data rejestracji:</h4>
                      <p className="text-primary-500/80 text-sm">{formatDate(companyData.registrationLegalDate)}</p>
                    </div>
                  )}
                  {companyData.registrationDenialDate && (
                    <div>
                      <h4 className="font-medium text-primary-500 text-sm">Data odmowy rejestracji:</h4>
                      <p className="text-primary-500/80 text-sm">{formatDate(companyData.registrationDenialDate)}</p>
                      {companyData.registrationDenialBasis && (
                        <p className="text-xs text-primary-500/70">Podstawa: {companyData.registrationDenialBasis}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status Changes */}
            {(companyData.restorationDate || companyData.removalDate) && (
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                  <div className="space-y-2 min-w-0">
                    {companyData.restorationDate && (
                      <div>
                        <h4 className="font-medium text-primary-500 text-sm">Przywrócenie jako podatnika VAT:</h4>
                        <p className="text-primary-500/80 text-sm">{formatDate(companyData.restorationDate)}</p>
                        {companyData.restorationBasis && (
                          <p className="text-xs text-primary-500/70">Podstawa: {companyData.restorationBasis}</p>
                        )}
                      </div>
                    )}
                    {companyData.removalDate && (
                      <div>
                        <h4 className="font-medium text-primary-500 text-sm">Wykreślenie jako podatnika VAT:</h4>
                        <p className="text-primary-500/80 text-sm">{formatDate(companyData.removalDate)}</p>
                        {companyData.removalBasis && (
                          <p className="text-xs text-primary-500/70">Podstawa: {companyData.removalBasis}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* People */}
          {(companyData.representatives.length > 0 || 
            companyData.authorizedClerks.length > 0 || 
            companyData.partners.length > 0) && (
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-primary-100">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-primary-500 mt-1 flex-shrink-0" />
                <div className="w-full min-w-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {companyData.representatives.length > 0 && (
                      <div>
                        <h4 className="font-medium text-primary-500 text-sm mb-2">Reprezentanci:</h4>
                        <ul className="space-y-1">
                          {companyData.representatives.map((rep, index) => (
                            <li key={index} className="text-primary-500/80 text-sm">
                              {rep.firstName} {rep.lastName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {companyData.authorizedClerks.length > 0 && (
                      <div>
                        <h4 className="font-medium text-primary-500 text-sm mb-2">Prokurenci:</h4>
                        <ul className="space-y-1">
                          {companyData.authorizedClerks.map((clerk, index) => (
                            <li key={index} className="text-primary-500/80 text-sm">
                              {clerk.firstName} {clerk.lastName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {companyData.partners.length > 0 && (
                      <div>
                        <h4 className="font-medium text-primary-500 text-sm mb-2">Wspólnicy:</h4>
                        <ul className="space-y-1">
                          {companyData.partners.map((partner, index) => (
                            <li key={index} className="text-primary-500/80 text-sm">
                              {partner.firstName} {partner.lastName}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
