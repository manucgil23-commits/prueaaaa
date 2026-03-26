import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PurchaseStep } from "@/pages/Compra";
import { useNavigate } from "react-router-dom";

interface Props {
  step: PurchaseStep;
  zone: string | null;
  onBack?: () => void;
}

const crumbs = (step: PurchaseStep, zone: string | null) => {
  const base = ["Evento"];
  if (step >= 2) base.push(zone ?? "Zona");
  if (step >= 3) base.push("Butacas");
  if (step === 3) base.push("Pago");
  if (step === 4) return ["Confirmación"];
  return base;
};

const PurchaseHeader = ({ step, zone, onBack }: Props) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="container flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && step > 1 ? (
            <button onClick={onBack} className="p-1.5 rounded-md hover:bg-muted transition-colors" aria-label="Volver">
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </button>
          ) : null}
          <a href="/" className="flex items-center gap-0 text-xl font-extrabold tracking-tight select-none">
            <span className="text-accent">T</span>
            <span className="text-primary">ele</span>
            <span className="text-accent">T</span>
            <span className="text-primary">aquilla</span>
          </a>
        </div>

        {/* Breadcrumb */}
        <nav className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground" aria-label="breadcrumb">
          {crumbs(step, zone).map((c, i, arr) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className={i === arr.length - 1 ? "text-foreground font-medium" : ""}>{c}</span>
              {i < arr.length - 1 && <span className="text-border">/</span>}
            </span>
          ))}
        </nav>

        <Button
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => navigate("/")}
        >
          Volver a eventos
        </Button>
      </div>
    </header>
  );
};

export default PurchaseHeader;
