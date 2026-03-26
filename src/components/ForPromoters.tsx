import { Button } from "@/components/ui/button";
import { BarChart3, Settings, Ticket } from "lucide-react";

const ForPromoters = () => {
  return (
    <section id="promotores" className="py-16 md:py-24 bg-primary relative overflow-hidden">
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">¿Organizas eventos?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              Gestiona tu recinto, configura precios por zona y vende entradas con nuestra plataforma. Sin complicaciones, sin cuotas mensuales.
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold px-8">
              Saber más
            </Button>
          </div>

          {/* Feature cards */}
          <div className="grid gap-4">
            {[
              { icon: Settings, title: "Panel de control", desc: "Gestiona eventos, aforos y precios desde un único dashboard." },
              { icon: BarChart3, title: "Analítica en tiempo real", desc: "Controla ventas, ingresos y ocupación al instante." },
              { icon: Ticket, title: "Venta multicanal", desc: "Vende online, en taquilla y a través de distribuidores." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-start gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5 border border-primary-foreground/10">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary-foreground text-sm">{item.title}</h3>
                    <p className="text-primary-foreground/70 text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForPromoters;
