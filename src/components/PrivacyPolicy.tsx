import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <div className="relative min-h-screen md:h-screen overflow-auto">
        {/* Back button */}
        <div className="sticky top-0 z-50 bg-gray-50/90 backdrop-blur-sm border-b border-primary-100">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-4 py-3 text-primary-500 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Powrót do strony głównej
            </Link>
          </div>
        </div>

        {/* Content */}
        <article className="max-w-4xl mx-auto px-4 py-6 text-primary-500/80">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-500 mb-8">Polityka Prywatności</h1>
          
          <h2 className="text-xl font-semibold text-primary-500 mt-6 mb-3">1. Wprowadzenie</h2>
          <p>
            KANCELARIA PODATKOWA JOLANTA STANKIEWICZ ("my", "nas" lub "nasze") szanuje Twoją prywatność i zobowiązuje się do ochrony Twoich danych osobowych. Niniejsza polityka prywatności informuje o tym, jak postępujemy z Twoimi danymi osobowymi podczas odwiedzania naszej strony internetowej oraz o Twoich prawach wynikających z Ogólnego Rozporządzenia o Ochronie Danych (RODO).
          </p>

          <h2 className="text-xl font-semibold text-primary-500 mt-6 mb-3">2. Dane kontaktowe</h2>
          <p>KANCELARIA PODATKOWA JOLANTA STANKIEWICZ</p>
          <p>ul. KOWALSKA 8-9/D</p>
          <p>82-300 Elbląg</p>
          <p>Polska</p>
          <p>Email: <a href="mailto:biuro@podatkistankiewicz.pl" className="text-primary-400 hover:text-primary-500">biuro@podatkistankiewicz.pl</a></p>
          <p>NIP: 5781419439</p>
          <p>REGON: 387861759</p>

          <h2 className="text-xl font-semibold text-primary-500 mt-6 mb-3">3. Dane osobowe, które zbieramy</h2>
          <p>Możemy zbierać i przetwarzać następujące dane:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Dane identyfikacyjne (imię, nazwisko)</li>
            <li>Dane kontaktowe (adres email, numer telefonu)</li>
            <li>Dane techniczne (adres IP, typ przeglądarki, informacje o urządzeniu)</li>
            <li>Dane o użytkowaniu (informacje o tym, jak korzystasz z naszej strony)</li>
          </ul>

          <h2 className="text-xl font-semibold text-primary-500 mt-6 mb-3">4. Jak wykorzystujemy Twoje dane</h2>
          <p>Wykorzystujemy Twoje dane osobowe do:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Świadczenia i zarządzania naszymi usługami</li>
            <li>Komunikacji z Tobą</li>
            <li>Ulepszania naszej strony internetowej i usług</li>
            <li>Marketingu (za Twoją zgodą)</li>
          </ul>

          <h2 className="text-xl font-semibold text-primary-500 mt-6 mb-3">5. Twoje prawa</h2>
          <p>Zgodnie z RODO, masz prawo do:</p>
          <ul className="list-disc pl-5 mt-2">
            <li>Dostępu do swoich danych osobowych</li>
            <li>Sprostowania niedokładnych danych osobowych</li>
            <li>Żądania usunięcia swoich danych osobowych</li>
            <li>Sprzeciwu wobec przetwarzania swoich danych osobowych</li>
            <li>Żądania ograniczenia przetwarzania</li>
            <li>Przenoszenia danych</li>
            <li>Wycofania zgody w dowolnym momencie</li>
          </ul>

          <h2 className="text-xl font-semibold text-primary-500 mt-6 mb-3">6. Pliki cookie</h2>
          <p>
            Nasza strona internetowa wykorzystuje pliki cookie w celu poprawy jakości przeglądania. Możesz kontrolować pliki cookie poprzez ustawienia przeglądarki. Używamy następujących rodzajów plików cookie:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Niezbędne pliki cookie: Wymagane do prawidłowego funkcjonowania strony</li>
            <li>Pliki cookie wydajności: Wykorzystywane przez Vercel Speed Insights do mierzenia i poprawy wydajności strony</li>
            <li>Pliki cookie analityczne: Pomagają nam zrozumieć, jak odwiedzający korzystają z naszej strony</li>
            <li>Pliki cookie marketingowe: Używane do dostarczania odpowiednich reklam</li>
          </ul>
          <p className="mt-3">
            Korzystamy z Vercel Speed Insights do monitorowania i poprawy wydajności naszej strony internetowej. Usługa ta zbiera anonimowe metryki wydajności, takie jak czas ładowania strony i wskaźniki web vitals. Dane te pomagają nam identyfikować i naprawiać problemy z wydajnością, aby zapewnić lepsze doświadczenie użytkownika. Poprzez tę usługę nie są zbierane żadne dane osobowe.
          </p>

          <h2 className="text-xl font-semibold text-primary-500 mt-6 mb-3">7. Bezpieczeństwo danych</h2>
          <p>
            Wdrożyliśmy odpowiednie środki bezpieczeństwa, aby zapobiec przypadkowej utracie, wykorzystaniu, dostępowi, zmianie lub ujawnieniu Twoich danych osobowych w sposób nieuprawniony. Ograniczamy dostęp do Twoich danych osobowych do pracowników, agentów, wykonawców i innych stron trzecich, którzy mają uzasadnioną potrzebę biznesową.
          </p>

          <h2 className="text-xl font-semibold text-primary-500 mt-6 mb-3">8. Aktualizacje polityki</h2>
          <p>
            Możemy aktualizować niniejszą politykę prywatności od czasu do czasu. O wszelkich istotnych zmianach poinformujemy, publikując nową politykę na tej stronie i aktualizując datę "ostatniej aktualizacji".
          </p>

          <h2 className="text-xl font-semibold text-primary-500 mt-6 mb-3">9. Kontakt</h2>
          <p>
            W przypadku pytań dotyczących tej polityki prywatności lub naszych praktyk w zakresie prywatności, prosimy o kontakt pod adresem{' '}
            <a href="mailto:biuro@podatkistankiewicz.pl" className="text-primary-400 hover:text-primary-500">
              biuro@podatkistankiewicz.pl
            </a>
          </p>

          <p className="text-sm text-primary-400 mt-8">Ostatnia aktualizacja: 11 grudnia 2024</p>
        </article>
      </div>
    </div>
  )
}
