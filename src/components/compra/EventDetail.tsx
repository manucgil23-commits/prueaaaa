import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

interface Zone {
  id: string;
  name: string;
  priceRange: string;
  available: number;
  color: string;
  path: string;
}

const ZONES: Zone[] = [
  { id: "sol", name: "Sol", priceRange: "15€ - 25€", available: 142, color: "hsl(37 93% 54%)", path: "M200,180 L300,140 L380,180 L380,280 L300,320 L200,280 Z" },
  { id: "sombra", name: "Sombra", priceRange: "30€ - 50€", available: 86, color: "hsl(212 100% 30%)", path: "M80,140 L200,80 L200,180 L200,280 L200,380 L80,320 Z" },
  { id: "tendido-alto", name: "Tendido Alto", priceRange: "20€ - 35€", available: 210, color: "hsl(142 60% 45%)", path: "M300,80 L420,80 L480,140 L380,180 L300,140 Z" },
  { id: "palcos", name: "Palcos VIP", priceRange: "60€ - 120€", available: 24, color: "hsl(0 70% 55%)", path: "M80,320 L200,380 L300,380 L380,280 L380,340 L300,400 L200,420 L80,380 Z" },
];

interface Props {
  event: { title: string; date: string; venue: string; category: string; description: string; image: string };
  onSelectZone: (zoneId: string) => void;
}

const EventDetail = ({ event, onSelectZone }: Props) => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="animate-fade-in-up">
      {/* Event Banner */}
      <div className="bg-primary text-primary-foreground">
        <div className="container py-8 flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-48 h-48 md:h-56 rounded-xl bg-primary-foreground/10 flex items-center justify-center overflow-hidden shrink-0">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-60" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <Badge className="bg-accent text-accent-foreground mb-3">{event.category}</Badge>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{event.title}</h1>
            <div className="flex flex-col sm:flex-row gap-3 text-primary-foreground/80 text-sm mb-3">
              <span className="flex items-center gap-1.5 justify-center md:justify-start">
                <CalendarDays className="h-4 w-4" /> {event.date}
              </span>
              <span className="flex items-center gap-1.5 justify-center md:justify-start">
                <MapPin className="h-4 w-4" /> {event.venue}
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm max-w-xl">{event.description}</p>
          </div>
        </div>
      </div>

      {/* Zones */}
      <div className="container py-10">
        <h2 className="text-xl font-bold text-foreground mb-6">Selecciona una zona</h2>

        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* SVG Map */}
          <div className="relative bg-muted rounded-xl p-4 flex flex-col items-center">
            <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
              <button onClick={() => setZoom((z) => Math.min(z + 0.2, 2))} className="p-1.5 bg-background rounded-md border shadow-sm hover:bg-muted transition-colors" aria-label="Zoom in">
                <ZoomIn className="h-4 w-4" />
              </button>
              <button onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))} className="p-1.5 bg-background rounded-md border shadow-sm hover:bg-muted transition-colors" aria-label="Zoom out">
                <ZoomOut className="h-4 w-4" />
              </button>
            </div>
            <svg
              viewBox="0 0 560 500"
              className="w-full max-w-lg transition-transform duration-300"
              style={{ transform: `scale(${zoom})` }}
            >
              {/* Arena outline */}
              <ellipse cx="280" cy="250" rx="250" ry="220" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
              <ellipse cx="280" cy="250" rx="80" ry="60" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1.5" />
              <text x="280" y="255" textAnchor="middle" className="text-[11px] fill-muted-foreground font-medium">Ruedo</text>

              {ZONES.map((zone) => (
                <g key={zone.id}>
                  <path
                    d={zone.path}
                    fill={hoveredZone === zone.id ? zone.color : `${zone.color}80`}
                    stroke={zone.color}
                    strokeWidth={hoveredZone === zone.id ? 3 : 1.5}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredZone(zone.id)}
                    onMouseLeave={() => setHoveredZone(null)}
                    onClick={() => onSelectZone(zone.id)}
                  />
                </g>
              ))}

              {/* Zone labels */}
              <text x="140" y="230" textAnchor="middle" className="text-[10px] fill-foreground font-semibold pointer-events-none">Sombra</text>
              <text x="290" y="230" textAnchor="middle" className="text-[10px] fill-foreground font-semibold pointer-events-none">Sol</text>
              <text x="380" y="120" textAnchor="middle" className="text-[10px] fill-foreground font-semibold pointer-events-none">T. Alto</text>
              <text x="240" y="400" textAnchor="middle" className="text-[10px] fill-foreground font-semibold pointer-events-none">Palcos VIP</text>
            </svg>

            {/* Tooltip */}
            {hoveredZone && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none">
                {(() => {
                  const z = ZONES.find((z) => z.id === hoveredZone)!;
                  return (
                    <span>
                      <strong>{z.name}</strong> — Desde {z.priceRange.split(" - ")[0]} · {z.available} disponibles
                    </span>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Zone List */}
          <div className="flex flex-col gap-3">
            {ZONES.map((zone) => (
              <div
                key={zone.id}
                className={`rounded-xl border p-4 flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer hover:shadow-md ${
                  hoveredZone === zone.id ? "ring-2 ring-accent shadow-md" : ""
                }`}
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: zone.color }} />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{zone.name}</p>
                    <p className="text-xs text-muted-foreground">{zone.priceRange} · {zone.available} disponibles</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 text-xs shrink-0"
                  onClick={() => onSelectZone(zone.id)}
                >
                  Seleccionar
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
