import { useEffect, useRef } from "react";
import { Tooltip } from "bootstrap";
import type { Badge } from "./CustomTypes";

type Props = {
  badges: Badge[];
  player_badges: number[];
};

function DisplayBadges({ badges = [], player_badges = [] }: Props) {
  const owned = new Set(player_badges);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const tooltipTriggerList = Array.from(
      root.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]'),
    );

    const tooltips: any[] = tooltipTriggerList.map(
      (el) => new (Tooltip as any)(el),
    );

    return () => {
      tooltips.forEach((t) => t.dispose());
    };
  }, [badges, player_badges]);

  return (
    <div ref={containerRef} style={{ gap: "6px", flexWrap: "wrap" }}>
      {badges.map((b) =>
        owned.has(b.id) ? (
          <img
            key={b.id}
            src={b.image}
            alt={b.name}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={b.description}
            style={{
              maxWidth: "35px",
              width: "5vw",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
        ) : null,
      )}
    </div>
  );
}

export default DisplayBadges;
