import z from 'zod'


export const SignUpFormScheme = z.object({
    email: z.string().email("Email must be a valid email address"),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
    name: z.string().min(2, "Name must be minimum 2 characters"),
    image:z.string().optional()
})

export type SignUpForm = z.infer<typeof SignUpFormScheme>
export const SignInFormScheme = z.object({
    email: z.string().email("Email must be a valid email address"),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
})

export type SignInForm = z.infer<typeof SignInFormScheme>

export type Token = {access_token: string}
export type TPlaylist = {
  name:string,
  tracks: string[],
  _id:string
}

export type User = { 
  _id:string,
  name:string,
  password:string, 
  email:string,
  image:string, 
  userType:string
  playlists: TPlaylist[],
  favorites: string[]  }
export interface Artist {
    external_urls: {
      spotify: string;
    };
    href: string;
    name: string;
    type: string;
    uri: string;
    aid: string
  }
  
  export interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: {
      spotify: string;
    };
    href: string; 
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }
  
  export interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    tid: string;
    external_ids: {
      isrc: string;
    };
    external_urls: {
      spotify: string;
    };
    href: string;
    is_local: boolean;
    name: string; 
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;  
}

export type Maybe<T> =  T | undefined | null
  
export type ServerResponse<T> = {
    message: string,
    data: T | undefined,
    status: number
}


export namespace AlbumTracks {
  export interface Tracks {
    data: Data
    extensions: Extensions
  }
  
  export interface Data {
    album: Album
  }
  
  export interface Album {
    playability: Playability
    tracks: Tracks
  }
  
  export interface Playability {
    playable: boolean
  }
  
  export interface Tracks {
    totalCount: number
    items: Item[]
  }
  
  export interface Item {
    uid: string
    track: Track
  }
  
  export interface Track {
    saved: boolean
    uri: string
    name: string
    playcount: string
    discNumber: number
    trackNumber: number
    contentRating: ContentRating
    relinkingInformation: any
    duration: Duration
    playability: Playability2
    artists: Artists
  }
  
  export interface ContentRating {
    label: string
  }
  
  export interface Duration {
    totalMilliseconds: number
  }
  
  export interface Playability2 {
    playable: boolean
  }
  
  export interface Artists {
    items: Item2[]
  }
  
  export interface Item2 {
    uri: string
    profile: Profile
  }
  
  export interface Profile {
    name: string
  }
  
  export interface Extensions {}
  
}

export namespace SpotifySearch {

export namespace MultiSearch {
  export interface SearchResults {
    albums: Albums
    artists: Artists2
    episodes: Episodes
    genres: Genres
    playlists: Playlists
    podcasts: Podcasts
    topResults: TopResults
    tracks: Track[]
    users: Users
  }
  
  export interface Albums {
    totalCount: number
    items: Item[]
  }
  
  export interface Item {
    data: Data
  }
  
  export interface Data {
    uri: string
    name: string
    artists: Artists
    coverArt: CoverArt
    date: Date
  }
  
  export interface Artists {
    items: Item2[]
  }
  
  export interface Item2 {
    uri: string
    profile: Profile
  }
  
  export interface Profile {
    name: string
  }
  
  export interface CoverArt {
    sources: Source[]
  }
  
  export interface Source {
    url: string
    width: number
    height: number
  }
  
  export interface Date {
    year: number
  }
  
  export interface Artists2 {
    totalCount: number
    items: Item3[]
  }
  
  export interface Item3 {
    data: Data2
  }
  
  export interface Data2 {
    uri: string
    profile: Profile2
    visuals: Visuals
  }
  
  export interface Profile2 {
    name: string
  }
  
  export interface Visuals {
    avatarImage: AvatarImage
  }
  
  export interface AvatarImage {
    sources: Source2[]
  }
  
  export interface Source2 {
    url: string
    width: number
    height: number
  }
  
  export interface Episodes {
    totalCount: number
    items: Item4[]
  }
  
  export interface Item4 {
    data: Data3
  }
  
  export interface Data3 {
    uri: string
    name: string
    coverArt: CoverArt2
    duration: Duration
    releaseDate: ReleaseDate
    podcast: Podcast
    description: string
    contentRating: ContentRating
  }
  
  export interface CoverArt2 {
    sources: Source3[]
  }
  
  export interface Source3 {
    url: string
    width: number
    height: number
  }
  
  export interface Duration {
    totalMilliseconds: number
  }
  
  export interface ReleaseDate {
    isoString: string
    precision: string
  }
  
  export interface Podcast {
    uri: string
    name: string
    coverArt: CoverArt3
    type: string
    publisher: Publisher
    mediaType: string
  }
  
  export interface CoverArt3 {
    sources: Source4[]
  }
  
  export interface Source4 {
    url: string
    width: number
    height: number
  }
  
  export interface Publisher {
    name: string
  }
  
  export interface ContentRating {
    label: string
  }
  
  export interface Genres {
    totalCount: number
    items: Item5[]
  }
  
  export interface Item5 {
    data: Data4
  }
  
  export interface Data4 {
    uri: string
    name: string
    image: Image
  }
  
  export interface Image {
    sources: Source5[]
  }
  
  export interface Source5 {
    url: string
    width: number
    height: number
  }
  
  export interface Playlists {
    totalCount: number
    items: Item6[]
  }
  
  export interface Item6 {
    data: Data5
  }
  
  export interface Data5 {
    uri: string
    name: string
    description: string
    images: Images
    owner: Owner
  }
  
  export interface Images {
    items: Item7[]
  }
  
  export interface Item7 {
    sources: Source6[]
  }
  
  export interface Source6 {
    url: string
    width?: number
    height?: number
  }
  
  export interface Owner {
    name: string
    uri: string
    username: string
  }
  
  export interface Podcasts {
    totalCount: number
    items: Item8[]
  }
  
  export interface Item8 {
    data: Data6
  }
  
  export interface Data6 {
    uri: string
    name: string
    coverArt: CoverArt4
    type: string
    publisher: Publisher2
    mediaType: string
  }
  
  export interface CoverArt4 {
    sources: Source7[]
  }
  
  export interface Source7 {
    url: string
    width: number
    height: number
  }
  
  export interface Publisher2 {
    name: string
  }
  
  export interface TopResults {
    items: Item9[]
    featured: Featured[]
  }
  
  export interface Item9 {
    data: Data7
  }
  
  export interface Data7 {
    uri: string
    profile?: Profile3
    visuals?: Visuals2
    id?: string
    name?: string
    albumOfTrack?: AlbumOfTrack
    artists?: Artists3
    contentRating?: ContentRating2
    duration?: Duration2
    playability?: Playability
  }
  
  export interface Profile3 {
    name: string
  }
  
  export interface Visuals2 {
    avatarImage: AvatarImage2
  }
  
  export interface AvatarImage2 {
    sources: Source8[]
  }
  
  export interface Source8 {
    url: string
    width: number
    height: number
  }
  
  export interface AlbumOfTrack {
    uri: string
    name: string
    coverArt: CoverArt5
    id: string
  }
  
  export interface CoverArt5 {
    sources: Source9[]
  }
  
  export interface Source9 {
    url: string
    width: number
    height: number
  }
  
  export interface Artists3 {
    items: Item10[]
  }
  
  export interface Item10 {
    uri: string
    profile: Profile4
  }
  
  export interface Profile4 {
    name: string
  }
  
  export interface ContentRating2 {
    label: string
  }
  
  export interface Duration2 {
    totalMilliseconds: number
  }
  
  export interface Playability {
    playable: boolean
  }
  
  export interface Featured {
    data: Data8
  }
  
  export interface Data8 {
    uri: string
    name: string
    description: string
    images: Images2
    owner: Owner2
  }
  
  export interface Images2 {
    items: Item11[]
  }
  
  export interface Item11 {
    sources: Source10[]
  }
  
  export interface Source10 {
    url: string
    width: any
    height: any
  }
  
  export interface Owner2 {
    name: string
    uri: string
    username: string
  }
  
  export interface Track {
    data: Data9
  }
  
  export interface Data9 {
    uri: string
    id: string
    name: string
    albumOfTrack: AlbumOfTrack2
    artists: Artists4
    contentRating: ContentRating3
    duration: Duration3
    playability: Playability2
  }
  
  export interface AlbumOfTrack2 {
    uri: string
    name: string
    coverArt: CoverArt6
    id: string
  }
  
  export interface CoverArt6 {
    sources: Source11[]
  }
  
  export interface Source11 {
    url: string
    width: number
    height: number
  }
  
  export interface Artists4 {
    items: Item12[]
  }
  
  export interface Item12 {
    uri: string
    profile: Profile5
  }
  
  export interface Profile5 {
    name: string
  }
  
  export interface ContentRating3 {
    label: string
  }
  
  export interface Duration3 {
    totalMilliseconds: number
  }
  
  export interface Playability2 {
    playable: boolean
  }
  
  export interface Users {
    totalCount: number
    items: Item13[]
  }
  
  export interface Item13 {
    data: Data10
  }
  
  export interface Data10 {
    uri: string
    id: string
    displayName: string
    username: string
    image: Image2
  }
  
  export interface Image2 {
    smallImageUrl: string
    largeImageUrl: string
  }
  
}


  export namespace AlbumSearch {

  export interface SearchResults {
    albums: Albums
  }
  
  export interface Albums {
    totalCount: number
    items: Item[]
  }
  
  export interface Item {
    data: Data
  }
  
  export interface Data {
    uri: string
    name: string
    artists: Artists
    coverArt: CoverArt
    date: Date
  }
  
  export interface Artists {
    items: Item2[]
  }
  
  export interface Item2 {
    uri: string
    profile: Profile
  }
  
  export interface Profile {
    name: string
  }
  
  export interface CoverArt {
    sources: Source[]
  }
  
  export interface Source {
    url: string
    width: number
    height: number
  }
  
  export interface Date {
    year: number
  }
}

  
 }

export namespace Top200 {
  export type Top200TrackResponse = Top200TrackResult[]

  export interface Top200TrackResult {
    chartEntryData: ChartEntryData
    missingRequiredFields: boolean
    trackMetadata: TrackMetadata
  }
  
  export interface ChartEntryData {
    currentRank: number
    previousRank: number
    peakRank: number
    peakDate: string
    appearancesOnChart: number
    consecutiveAppearancesOnChart: number
    rankingMetric: RankingMetric
    entryStatus: string
    entryRank: number
    entryDate: string
  }
  
  export interface RankingMetric {
    value: string
    type: string
  }
  
  export interface TrackMetadata {
    trackName: string
    trackUri: string
    displayImageUri: string
    artists: Artist[]
    producers: any[]
    labels: Label[]
    songWriters: any[]
    releaseDate: string
  }
  
  export interface Artist {
    name: string
    spotifyUri: string
    externalUrl: string
  }
  
  export interface Label {
    name: string
    spotifyUri: string
    externalUrl: string
  }
  
}