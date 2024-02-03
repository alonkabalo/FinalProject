import { Axios } from "axios";
import { AlbumTracks, SpotifySearch, Top200, Track } from "../@Types";

const spotifyClient = new Axios({
    baseURL: "https://spotify81.p.rapidapi.com/",
    headers: {
        'Content-Type' : 'application/json',
        'X-RapidAPI-Key': process.env.REACT_APP_SPOTIFY_API_KEY,
        'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
    }
})

export async function getTop200Tracks(country: string): Promise<Top200.Top200TrackResponse> {
    return spotifyClient.get(`top_200_tracks?country=${country}`)
    .then(response => JSON.parse(response.data))
}


export async function search(query: string): Promise<SpotifySearch.MultiSearch.SearchResults> {
    return spotifyClient.get(`search?q=${query}&limit=100&type=multi`)
    .then(response => JSON.parse(response.data))
}

export async function searchAlbums(query: string): Promise<SpotifySearch.AlbumSearch.SearchResults> {
    return spotifyClient.get(`search?q=${query}&limit=15&type=albums`)
    .then(response => JSON.parse(response.data))
}

export async function getAlbumsMetaData(albumId: string): Promise<{
    data: {
        album: SpotifySearch.AlbumSearch.Data
    }
}> {
    return spotifyClient.get(`album_metadata?id=${albumId}`)
    .then(response => JSON.parse(response.data))
}


export async function getTracksByIds(trackIds: string[]): Promise<{ tracks: Track[] }> {
    const tracks = trackIds.join(",")
    return spotifyClient.get(`tracks?ids=${tracks}`)
    .then(response => JSON.parse(response.data))
}


export async function getAlbumTracks(albumId: string): Promise<AlbumTracks.Tracks> {
    return spotifyClient.get(`album_tracks?id=${albumId}&limit=300&offset=0`)
    .then(response => JSON.parse(response.data))
}

//navigator.geolocation.getCurrentPosition()