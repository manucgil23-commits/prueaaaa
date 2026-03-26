import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-0 text-2xl font-extrabold tracking-tight select-none">
          <span className="text-accent">T</span>
          <span className="text-primary">ele</span>
          <span className="text-accent">T</span>
          <span className="text-primary">aquilla</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#eventos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Eventos</a>
          <a href="#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Cómo funciona</a>
          <a href="#promotores" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Para promotores</a>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            Mis entradas
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menú">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t bg-background pb-4">
          <div className="container flex flex-col gap-3 pt-4">
            <a href="#eventos" className="text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Eventos</a>
            <a href="#como-funciona" className="text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Cómo funciona</a>
            <a href="#promotores" className="text-sm font-medium py-2" onClick={() => setMobileOpen(false)}>Para promotores</a>
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full">
              Mis entradas
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
