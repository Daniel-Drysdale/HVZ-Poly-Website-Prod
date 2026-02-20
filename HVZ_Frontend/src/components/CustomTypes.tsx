export type Badge = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type Player = {
  id: number;
  name: string;
  status: number;
  tags: string;
  image: string;
  badgeIds: number[];
  named_tags: string;
};
