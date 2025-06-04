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

export type PlaylistTrack = {
  added_at: string;
  added_by: {
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  track: {
    album: {
      album_type: string;
      artists: Array<{
        external_urls: { spotify: string };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }>;
      available_markets: string[];
      external_urls: { spotify: string };
      href: string;
      id: string;
      images: Image[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: Array<{
      external_urls: { spotify: string };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }>;
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    episode: boolean;
    explicit: boolean;
    external_ids: { isrc: string };
    external_urls: { spotify: string };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track: boolean;
    track_number: number;
    type: string;
    uri: string;
  };
};

export type PlaylistObject = SimplifiedPlaylistObject & {
  description: string;
  followers: {
    href: string | null;
    total: number;
  };
  tracks: SpotifyPaging<PlaylistTrack>;
};
