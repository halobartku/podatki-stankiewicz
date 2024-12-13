import { useState } from 'react';
import { motion } from 'framer-motion';
import { verifyCompany } from '../../lib/api/kas';
import type { PolishCompanyData } from '../../lib/api/types';
import { cn } from '../../lib/utils';

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-gray-50/50 backdrop-blur-sm rounded-lg border border-white/10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nip" className="block text-sm font-medium text-gray-800">
            NIP
          </label>
          <input
            type="text"
            id="nip"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            className={cn(
              "mt-1 block w-full rounded-md border border-white/10 bg-white/5",
              "px-3 py-2 text-sm backdrop-blur-sm",
              "focus:border-white focus:ring-2 focus:ring-white/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-colors duration-200"
            )}
            placeholder="Wprowadź NIP"
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
          {loading ? 'Weryfikacja...' : 'Zweryfikuj NIP'}
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

      {companyData && (
        <div className={cn(
          "p-4 rounded-lg border backdrop-blur-sm",
          companyData.statusVat === "Czynny" 
            ? "border-success-light/20 bg-success-light/10" 
            : "border-warning-light/20 bg-warning-light/10"
        )}>
          <div className={cn(
            "text-lg font-medium mb-3",
            companyData.statusVat === "Czynny" ? "text-success-dark" : "text-warning-dark"
          )}>
            Status: {companyData.statusVat}
          </div>
          <dl className="space-y-2 text-sm text-gray-700">
            <div className="flex">
              <dt className="w-32 font-medium">Nazwa firmy:</dt>
              <dd className="flex-1">{companyData.name}</dd>
            </div>
            <div className="flex">
              <dt className="w-32 font-medium">NIP:</dt>
              <dd>{companyData.nip}</dd>
            </div>
            <div className="flex">
              <dt className="w-32 font-medium">REGON:</dt>
              <dd>{companyData.regon}</dd>
            </div>
            <div className="flex">
              <dt className="w-32 font-medium">KRS:</dt>
              <dd>{companyData.krs || 'Brak'}</dd>
            </div>
            <div className="flex">
              <dt className="w-32 font-medium">Adres:</dt>
              <dd className="flex-1">{companyData.workingAddress}</dd>
            </div>
            {companyData.residenceAddress && companyData.residenceAddress !== companyData.workingAddress && (
              <div className="flex">
                <dt className="w-32 font-medium">Adres siedziby:</dt>
                <dd className="flex-1">{companyData.residenceAddress}</dd>
              </div>
            )}
            {companyData.registrationLegalDate && (
              <div className="flex">
                <dt className="w-32 font-medium">Data rejestracji:</dt>
                <dd>{formatDate(companyData.registrationLegalDate)}</dd>
              </div>
            )}
            {companyData.accountNumbers && companyData.accountNumbers.length > 0 && (
              <div className="flex">
                <dt className="w-32 font-medium">Konta bankowe:</dt>
                <dd className="flex-1">
                  <ul className="list-disc list-inside space-y-1">
                    {companyData.accountNumbers.map((account, index) => (
                      <li key={index}>{account}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            {companyData.representatives && companyData.representatives.length > 0 && (
              <div className="flex">
                <dt className="w-32 font-medium">Reprezentanci:</dt>
                <dd className="flex-1">
                  <ul className="list-disc list-inside space-y-1">
                    {companyData.representatives.map((rep, index) => (
                      <li key={index}>{rep.firstName} {rep.lastName}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            {companyData.authorizedClerks && companyData.authorizedClerks.length > 0 && (
              <div className="flex">
                <dt className="w-32 font-medium">Prokurenci:</dt>
                <dd className="flex-1">
                  <ul className="list-disc list-inside space-y-1">
                    {companyData.authorizedClerks.map((clerk, index) => (
                      <li key={index}>{clerk.firstName} {clerk.lastName}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            {companyData.partners && companyData.partners.length > 0 && (
              <div className="flex">
                <dt className="w-32 font-medium">Wspólnicy:</dt>
                <dd className="flex-1">
                  <ul className="list-disc list-inside space-y-1">
                    {companyData.partners.map((partner, index) => (
                      <li key={index}>{partner.firstName} {partner.lastName}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}
