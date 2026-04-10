import { useEffect, useRef } from "react";
import Tooltip from "bootstrap/js/dist/tooltip";
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

    const tooltipElements = Array.from(
      root.querySelectorAll<HTMLElement>('[data-bs-toggle="tooltip"]'),
    );

    const tooltips = tooltipElements.map((el) => {
      Tooltip.getInstance(el)?.dispose();

      return new Tooltip(el, {
        placement: "top",
        trigger: "hover focus",
      });
    });

    return () => {
      tooltips.forEach((t) => t.dispose());
    };
  }, [badges, player_badges]);

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}
    >
      {badges.map((b) =>
        owned.has(b.id) ? (
          <img
            key={b.id}
            className="badge-glow"
            src={b.image}
            alt={b.name}
            title={b.description ?? ""}
            data-bs-toggle="tooltip"
            style={{
              maxWidth: "35px",
              width: "5vw",
              marginLeft: "5px",
              marginRight: "5px",
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
