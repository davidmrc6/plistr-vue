export type UserProfile = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
};

export type Image = {
  url: string;
  height: number;
  width: number;
};

export type SpotifyPaging<T> = {
  items: T[];
  limit: number;
  offset: number;
  total: number;
  next: string | null;
  previous: string | null;
};

export type SimplifiedPlaylistObject = {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: {
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    url: string;
    display_name: string;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
};
