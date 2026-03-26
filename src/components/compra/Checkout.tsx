import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Clock, CreditCard, Lock, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import type { SelectedSeat } from "@/pages/Compra";

interface Props {
  event: { title: string; date: string; venue: string };
  zone: string | null;
  selectedSeats: SelectedSeat[];
  total: number;
  onPay: () => void;
}

const Checkout = ({ event, zone, selectedSeats, total, onPay }: Props) => {
  const [accepted, setAccepted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(12 * 60 + 47);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const fees = 0;
  const grandTotal = total + fees;

  return (
    <div className="animate-fade-in-up">
      {/* Timer */}
      <div className="bg-accent/10 border-b border-accent/20">
        <div className="container py-2 flex items-center justify-center gap-2 text-sm font-medium text-accent-foreground">
          <Clock className="h-4 w-4 text-accent" />
          <span>Reserva expira en <strong>{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}</strong></span>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Datos del comprador</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Nombre completo</label>
                <Input placeholder="Ej: María García López" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <Input type="email" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Confirmar email</label>
                <Input type="email" placeholder="Repite tu email" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Teléfono <span className="text-muted-foreground font-normal">(opcional)</span>
                </label>
                <Input type="tel" placeholder="+34 600 000 000" />
              </div>
            </div>

            {/* Payment */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-bold text-foreground mb-4">Método de pago</h3>
              <div className="flex items-center gap-3 p-4 border rounded-xl bg-muted/50">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">Tarjeta de crédito/débito</span>
                <div className="ml-auto flex gap-2 text-xs text-muted-foreground font-semibold">
                  <span className="px-2 py-0.5 bg-background border rounded">VISA</span>
                  <span className="px-2 py-0.5 bg-background border rounded">MC</span>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <Input placeholder="Número de tarjeta" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="MM/AA" />
                  <Input placeholder="CVC" />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-2">
              <Checkbox id="terms" checked={accepted} onCheckedChange={(v) => setAccepted(v === true)} className="mt-0.5" />
              <label htmlFor="terms" className="text-sm text-muted-foreground leading-snug cursor-pointer">
                Acepto los <a href="#" className="text-primary underline">términos y condiciones</a> y la <a href="#" className="text-primary underline">política de privacidad</a>.
              </label>
            </div>

            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base h-12"
              disabled={!accepted}
              onClick={onPay}
            >
              Pagar {grandTotal}€
            </Button>
          </div>

          {/* Order Summary */}
          <div className="bg-background rounded-xl border p-5 flex flex-col gap-4 h-fit lg:sticky lg:top-20">
            <h3 className="font-bold text-foreground">Resumen del pedido</h3>
            <div className="space-y-1 text-sm">
              <p className="font-semibold text-foreground">{event.title}</p>
              <p className="text-muted-foreground">{event.date}</p>
              <p className="text-muted-foreground">{event.venue}</p>
              {zone && <Badge variant="secondary" className="mt-1 capitalize">{zone}</Badge>}
            </div>

            <div className="border-t pt-3 space-y-2">
              {selectedSeats.map((s) => (
                <div key={`${s.row}-${s.number}`} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fila {s.row}, Butaca {s.number}</span>
                  <span className="text-foreground font-medium">{s.price}€</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{total}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gastos de gestión</span>
                <span className="text-primary font-medium">Gratis</span>
              </div>
            </div>

            <div className="border-t pt-3 flex justify-between items-center">
              <span className="font-bold text-foreground">TOTAL</span>
              <span className="text-2xl font-bold text-foreground">{grandTotal}€</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
              <Lock className="h-4 w-4 text-primary shrink-0" />
              <span>Pago 100% seguro. Tus datos están protegidos.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>Recibirás tus entradas por email al instante.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
