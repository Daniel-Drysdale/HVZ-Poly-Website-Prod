import { useEffect, useState } from "react";

export type Badge = {
  id: number;
  name: string;
  image: string;
};

const LoadBadges = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const BASE_URL = import.meta.env.VITE_BASE_API_URL;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${BASE_URL}v2/api/get_badge_list/`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Error in Fetch, Status is " + response.status);
        }

        const backendData = await response.json();

        const formatted: Badge[] = backendData.data.map((badge: any) => ({
          id: Number(badge.id),
          name: String(badge.name ?? ""),
          image: String(badge.image ?? ""),
        }));

        setBadges(formatted);
        console.log(formatted);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [BASE_URL]);
  return badges;
};
export default LoadBadges;
