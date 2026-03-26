import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import eventToros from "@/assets/event-toros.jpg";
import eventTeatro from "@/assets/event-teatro.jpg";
import eventDeportes from "@/assets/event-deportes.jpg";
import eventConcierto from "@/assets/event-concierto.jpg";

const events = [
  {
    id: 1,
    title: "Feria de San Isidro 2026",
    category: "Toros",
    date: "15 May 2026 · 18:00",
    venue: "Plaza de Las Ventas, Madrid",
    price: "25€",
    image: eventToros,
  },
  {
    id: 2,
    title: "Rosalía — Motomami World Tour",
    category: "Conciertos",
    date: "22 Jun 2026 · 21:00",
    venue: "WiZink Center, Madrid",
    price: "45€",
    image: eventConcierto,
  },
  {
    id: 3,
    title: "El Rey León — El Musical",
    category: "Teatro",
    date: "10 Jul 2026 · 20:30",
    venue: "Teatro Lope de Vega, Madrid",
    price: "35€",
    image: eventTeatro,
  },
  {
    id: 4,
    title: "Real Madrid vs FC Barcelona",
    category: "Deportes",
    date: "5 Ago 2026 · 21:00",
    venue: "Santiago Bernabéu, Madrid",
    price: "90€",
    image: eventDeportes,
  },
];

const FeaturedEvents = () => {
  const navigate = useNavigate();
  return (
    <section id="eventos" className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Eventos destacados</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Descubre los eventos más populares y consigue tus entradas antes de que se agoten.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event) => (
            <article key={event.id} className="group bg-card rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={768}
                  height={512}
                />
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {event.category}
                </span>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h3 className="font-bold text-foreground leading-snug line-clamp-2">{event.title}</h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <Calendar className="h-3.5 w-3.5" />
                  {event.date}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <MapPin className="h-3.5 w-3.5" />
                  {event.venue}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold text-foreground">Desde {event.price}</span>
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-xs" onClick={() => navigate("/compra")}>
                    Comprar
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
