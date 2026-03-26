import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/50" />

      <div className="container relative z-10 py-20 md:py-28">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6">
            Compra tus entradas en segundos
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 leading-relaxed max-w-xl">
            La plataforma de confianza para eventos en vivo. Elige tu butaca, paga seguro, recibe tu entrada al instante.
          </p>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8 py-6 shadow-lg">
            Ver eventos disponibles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
