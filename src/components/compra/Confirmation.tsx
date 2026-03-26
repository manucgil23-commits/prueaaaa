import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Download, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { SelectedSeat } from "@/pages/Compra";

interface Props {
  event: { title: string; date: string; venue: string };
  orderRef: string;
  selectedSeats: SelectedSeat[];
  total: number;
}

const Confirmation = ({ event, orderRef, selectedSeats, total }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in-up">
      <div className="container py-12 max-w-2xl mx-auto text-center">
        {/* Success icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-bounce-once">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">¡Compra completada!</h1>
        <p className="text-muted-foreground mb-8">
          Hemos enviado tus entradas a <strong className="text-foreground">tu@email.com</strong>
        </p>

        {/* Order Card */}
        <div className="bg-background border rounded-xl p-6 text-left space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Referencia</span>
            <Badge variant="outline" className="font-mono text-sm">{orderRef}</Badge>
          </div>
          <div className="border-t pt-3 space-y-1 text-sm">
            <p className="font-semibold text-foreground">{event.title}</p>
            <p className="text-muted-foreground">{event.date}</p>
            <p className="text-muted-foreground">{event.venue}</p>
          </div>
          <div className="border-t pt-3 space-y-2">
            {selectedSeats.map((s) => (
              <div key={`${s.row}-${s.number}`} className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fila {s.row}, Butaca {s.number}</span>
                <span className="text-foreground font-medium">{s.price}€</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3 flex justify-between items-center">
            <span className="font-bold text-foreground">Total pagado</span>
            <span className="text-xl font-bold text-foreground">{total}€</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2">
            <Download className="h-4 w-4" /> Descargar entradas (PDF)
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            Volver a eventos
          </Button>
        </div>

        {/* Lookup Section */}
        <div className="border-t pt-10">
          <h3 className="text-lg font-bold text-foreground mb-2">¿Ya tienes entradas?</h3>
          <p className="text-sm text-muted-foreground mb-4">Busca tu pedido introduciendo tu referencia y email.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input placeholder="Referencia (TTK-XXXXXX)" className="flex-1" />
            <Input placeholder="Email" type="email" className="flex-1" />
            <Button variant="outline" className="gap-1.5 shrink-0">
              <Search className="h-4 w-4" /> Buscar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
