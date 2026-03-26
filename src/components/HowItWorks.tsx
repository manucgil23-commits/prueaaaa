import { CalendarDays, LayoutGrid, QrCode } from "lucide-react";

const steps = [
  { icon: CalendarDays, title: "Elige tu evento", desc: "Explora nuestro catálogo de eventos en vivo y encuentra el que más te guste." },
  { icon: LayoutGrid, title: "Selecciona tu butaca", desc: "Elige el asiento perfecto con nuestro mapa interactivo del recinto." },
  { icon: QrCode, title: "Recibe tu entrada", desc: "Recibe tu entrada digital al instante en tu correo o descárgala en la app." },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-16 md:py-20 bg-surface-alt">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Cómo funciona</h2>
          <p className="text-muted-foreground">En solo 3 pasos tienes tu entrada lista.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-border" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-5 shadow-lg">
                  <Icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Paso {i + 1}</span>
                <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-xs">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
