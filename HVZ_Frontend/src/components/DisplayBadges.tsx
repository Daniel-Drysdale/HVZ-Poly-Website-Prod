type Badge = {
  id: number;
  name: string;
  image: string;
};

type Props = {
  badges: Badge[];
  player_badges: number[];
};

function DisplayBadges({ badges = [], player_badges = [] }: Props) {
  const owned = new Set(player_badges);

  return (
    <div style={{ gap: "6px", flexWrap: "wrap" }}>
      {badges.map((b) =>
        owned.has(b.id) ? (
          <img
            key={b.id}
            src={b.image}
            title={b.name}
            alt={b.name}
            style={{
              minWidth: "25px",
              width: "50%",
              maxWidth: "45px",
              objectFit: "contain",
            }}
          />
        ) : null,
      )}
    </div>
  );
}

export default DisplayBadges;
