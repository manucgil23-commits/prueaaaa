import { useState } from "react";
import EventDetail from "@/components/compra/EventDetail";
import SeatSelection from "@/components/compra/SeatSelection";
import Checkout from "@/components/compra/Checkout";
import Confirmation from "@/components/compra/Confirmation";
import PurchaseHeader from "@/components/compra/PurchaseHeader";

export type SelectedSeat = {
  row: string;
  number: number;
  price: number;
};

export type PurchaseStep = 1 | 2 | 3 | 4;

const MOCK_EVENT = {
  title: "Corrida de Toros — Feria de San Isidro",
  date: "Sábado, 14 de junio de 2026 — 19:00h",
  venue: "Plaza de Toros de Las Ventas, Madrid",
  category: "Toros",
  description:
    "Gran corrida de la Feria de San Isidro con los mejores matadores del panorama nacional. Una experiencia única en el coso más importante del mundo.",
  image: "/placeholder.svg",
};

const Compra = () => {
  const [step, setStep] = useState<PurchaseStep>(1);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  const [orderRef, setOrderRef] = useState("");

  const goToZoneSelection = (zone: string) => {
    setSelectedZone(zone);
    setStep(2);
  };

  const goToCheckout = () => setStep(3);

  const goToConfirmation = () => {
    setOrderRef(`TTK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    setStep(4);
  };

  const goBack = () => {
    if (step === 2) { setStep(1); setSelectedSeats([]); }
    else if (step === 3) setStep(2);
  };

  const toggleSeat = (seat: SelectedSeat) => {
    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.row === seat.row && s.number === seat.number);
      if (exists) return prev.filter((s) => !(s.row === seat.row && s.number === seat.number));
      if (prev.length >= 6) return prev;
      return [...prev, seat];
    });
  };

  const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PurchaseHeader step={step} zone={selectedZone} onBack={step < 4 ? goBack : undefined} />
      <main className="flex-1">
        <div
          className={`transition-opacity duration-300 ${step === 1 ? "opacity-100" : "opacity-0 hidden"}`}
        >
          <EventDetail event={MOCK_EVENT} onSelectZone={goToZoneSelection} />
        </div>
        <div
          className={`transition-opacity duration-300 ${step === 2 ? "opacity-100" : "opacity-0 hidden"}`}
        >
          <SeatSelection
            zone={selectedZone}
            selectedSeats={selectedSeats}
            onToggleSeat={toggleSeat}
            onContinue={goToCheckout}
            total={total}
          />
        </div>
        <div
          className={`transition-opacity duration-300 ${step === 3 ? "opacity-100" : "opacity-0 hidden"}`}
        >
          <Checkout
            event={MOCK_EVENT}
            zone={selectedZone}
            selectedSeats={selectedSeats}
            total={total}
            onPay={goToConfirmation}
          />
        </div>
        <div
          className={`transition-opacity duration-300 ${step === 4 ? "opacity-100" : "opacity-0 hidden"}`}
        >
          <Confirmation event={MOCK_EVENT} orderRef={orderRef} selectedSeats={selectedSeats} total={total} />
        </div>
      </main>
    </div>
  );
};

export default Compra;
