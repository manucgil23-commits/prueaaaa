import { Button } from "@/components/ui/button";
import { Clock, ZoomIn, ZoomOut } from "lucide-react";
import { useState, useEffect } from "react";
import type { SelectedSeat } from "@/pages/Compra";

type SeatStatus = "available" | "occupied" | "reserved" | "selected";

interface SeatData {
  row: string;
  number: number;
  price: number;
  status: SeatStatus;
}

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const SEATS_PER_ROW = 16;
const BASE_PRICE = 25;

const generateSeats = (): SeatData[] => {
  const seats: SeatData[] = [];
  ROWS.forEach((row) => {
    for (let n = 1; n <= SEATS_PER_ROW; n++) {
      const rand = Math.random();
      let status: SeatStatus = "available";
      if (rand < 0.2) status = "occupied";
      else if (rand < 0.27) status = "reserved";
      seats.push({ row, number: n, price: BASE_PRICE + (row.charCodeAt(0) - 65) * 2, status });
    }
  });
  return seats;
};

const SEAT_COLORS: Record<SeatStatus, string> = {
  available: "hsl(142 60% 45%)",
  occupied: "hsl(var(--muted-foreground) / 0.3)",
  reserved: "hsl(0 70% 55%)",
  selected: "hsl(37 93% 54%)",
};

interface Props {
  zone: string | null;
  selectedSeats: SelectedSeat[];
  onToggleSeat: (seat: SelectedSeat) => void;
  onContinue: () => void;
  total: number;
}

const SeatSelection = ({ zone, selectedSeats, onToggleSeat, onContinue, total }: Props) => {
  const [seats] = useState(generateSeats);
  const [zoom, setZoom] = useState(1);
  const [hoveredSeat, setHoveredSeat] = useState<SeatData | null>(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (selectedSeats.length === 0) return;
    const interval = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [selectedSeats.length]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const isSeatSelected = (row: string, num: number) =>
    selectedSeats.some((s) => s.row === row && s.number === num);

  const getSeatStatus = (seat: SeatData): SeatStatus =>
    isSeatSelected(seat.row, seat.number) ? "selected" : seat.status;

  return (
    <div className="animate-fade-in-up">
      {/* Timer */}
      {selectedSeats.length > 0 && (
        <div className="bg-accent/10 border-b border-accent/20">
          <div className="container py-2 flex items-center justify-center gap-2 text-sm font-medium text-accent-foreground">
            <Clock className="h-4 w-4 text-accent" />
            <span>Reserva expira en <strong>{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}</strong></span>
          </div>
        </div>
      )}

      <div className="container py-8">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Seat Map */}
          <div className="relative bg-muted rounded-xl p-6 flex flex-col items-center overflow-hidden">
            <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
              <button onClick={() => setZoom((z) => Math.min(z + 0.15, 1.8))} className="p-1.5 bg-background rounded-md border shadow-sm hover:bg-muted" aria-label="Zoom in">
                <ZoomIn className="h-4 w-4" />
              </button>
              <button onClick={() => setZoom((z) => Math.max(z - 0.15, 0.6))} className="p-1.5 bg-background rounded-md border shadow-sm hover:bg-muted" aria-label="Zoom out">
                <ZoomOut className="h-4 w-4" />
              </button>
            </div>

            {/* Stage */}
            <div className="mb-4 px-12 py-2 bg-primary/10 text-primary text-xs font-semibold rounded-b-xl tracking-widest uppercase">
              Escenario
            </div>

            <svg
              viewBox={`0 0 ${SEATS_PER_ROW * 28 + 60} ${ROWS.length * 28 + 40}`}
              className="w-full max-w-2xl transition-transform duration-300"
              style={{ transform: `scale(${zoom})` }}
            >
              {seats.map((seat) => {
                const x = 30 + (seat.number - 1) * 28;
                const y = 20 + ROWS.indexOf(seat.row) * 28;
                const status = getSeatStatus(seat);
                const clickable = status === "available" || status === "selected";
                return (
                  <g key={`${seat.row}-${seat.number}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={10}
                      fill={SEAT_COLORS[status]}
                      className={`transition-colors duration-150 ${clickable ? "cursor-pointer hover:stroke-foreground hover:stroke-2" : "cursor-not-allowed"}`}
                      onClick={() => clickable && onToggleSeat({ row: seat.row, number: seat.number, price: seat.price })}
                      onMouseEnter={() => clickable && setHoveredSeat(seat)}
                      onMouseLeave={() => setHoveredSeat(null)}
                    />
                  </g>
                );
              })}
              {/* Row labels */}
              {ROWS.map((row, i) => (
                <text key={row} x="8" y={25 + i * 28} className="text-[10px] fill-muted-foreground font-medium" textAnchor="middle">
                  {row}
                </text>
              ))}
            </svg>

            {/* Tooltip */}
            {hoveredSeat && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs rounded-lg px-3 py-2 shadow-lg pointer-events-none whitespace-nowrap">
                Fila {hoveredSeat.row}, Butaca {hoveredSeat.number} — {hoveredSeat.price}€
              </div>
            )}

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 text-xs text-muted-foreground">
              {(["available", "occupied", "selected", "reserved"] as SeatStatus[]).map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: SEAT_COLORS[s] }} />
                  {s === "available" ? "Disponible" : s === "occupied" ? "Ocupada" : s === "selected" ? "Tu selección" : "Reservada"}
                </span>
              ))}
            </div>
          </div>

          {/* Selection Summary */}
          <div className="bg-background rounded-xl border p-5 flex flex-col gap-4 h-fit lg:sticky lg:top-20">
            <h3 className="font-bold text-foreground">Tu selección</h3>
            {selectedSeats.length === 0 ? (
              <p className="text-sm text-muted-foreground">Haz clic en una butaca disponible para seleccionarla (máx. 6).</p>
            ) : (
              <ul className="space-y-2">
                {selectedSeats.map((s) => (
                  <li key={`${s.row}-${s.number}`} className="flex items-center justify-between text-sm border-b pb-2 last:border-0">
                    <span className="text-foreground">Fila {s.row}, Butaca {s.number}</span>
                    <span className="font-semibold text-foreground">{s.price}€</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t pt-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-foreground">{total}€</span>
            </div>

            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
              disabled={selectedSeats.length === 0}
              onClick={onContinue}
            >
              Continuar al pago
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
