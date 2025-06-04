import type {
  SimplifiedPlaylistObject,
  UserProfile,
  SpotifyPaging,
} from "@/types/spotifyTypes";

export async function fetchProfile(token: string): Promise<UserProfile> {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

export async function fetchPlaylists(
  token: string,
): Promise<SimplifiedPlaylistObject[]> {
  const urlBase = "https://api.spotify.com/v1/me/playlists";
  const limit = 50;
  let offset = 0;

  let allPlaylists: SimplifiedPlaylistObject[] = [];
  let next: string | null = `${urlBase}?limit=${limit}&offset=${offset}`;

  while (next) {
    const res = await fetch(next, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error(
        `Failed to fetch playlists: ${res.status} ${res.statusText}`,
      );
    }

    const page: SpotifyPaging<SimplifiedPlaylistObject> = await res.json();
    allPlaylists = allPlaylists.concat(page.items);

    next = page.next;
    offset += limit;
  }

  return allPlaylists;
}
