import { useState } from "react";
import { Music, Theater, Film, Trophy, Flame } from "lucide-react";

const categories = [
  { label: "Toros", icon: Flame },
  { label: "Conciertos", icon: Music },
  { label: "Teatro", icon: Theater },
  { label: "Cine", icon: Film },
  { label: "Deportes", icon: Trophy },
];

const Categories = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-10 bg-background">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = active === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setActive(isActive ? null : cat.label)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-background text-foreground border-border hover:border-primary/40 hover:shadow-sm"
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
