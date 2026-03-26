const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <a href="#" className="text-xl font-extrabold tracking-tight select-none">
              <span className="text-accent">T</span>ele<span className="text-accent">T</span>aquilla
            </a>
            <p className="text-sm mt-3 opacity-60">Tus entradas, al instante.</p>
          </div>

          {/* Eventos */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wider opacity-70">Eventos</h4>
            <ul className="space-y-2 text-sm opacity-60">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Toros</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Conciertos</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Teatro</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Deportes</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wider opacity-70">Legal</h4>
            <ul className="space-y-2 text-sm opacity-60">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Política de privacidad</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Condiciones de uso</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Política de cookies</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wider opacity-70">Contacto</h4>
            <ul className="space-y-2 text-sm opacity-60">
              <li><a href="mailto:info@teletaquilla.com" className="hover:opacity-100 transition-opacity">info@teletaquilla.com</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Soporte</a></li>
              <li><a href="#promotores" className="hover:opacity-100 transition-opacity">Para promotores</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-6 text-center text-sm opacity-50">
          © 2026 TeleTaquilla — Un producto de Welow Marketing
        </div>
      </div>
    </footer>
  );
};

export default Footer;
