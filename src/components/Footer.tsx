import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 py-1 bg-primary-500 backdrop-blur-sm shadow-[0_-8px_16px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center text-xs text-white/90">
          <div>{new Date().getFullYear()} Kancelaria Podatkowa Stankiewicz. Wszelkie prawa zastrzeżone.</div>
          <Link 
            to="/privacy"
            className="text-white/90 hover:text-white transition-colors duration-200"
          >
            Polityka Prywatności
          </Link>
        </div>
      </div>
    </footer>
  );
}
