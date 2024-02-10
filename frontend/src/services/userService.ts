import httpClient from ".";
import { ServerResponse, SignInForm, SignUpForm, Token, User } from "../@Types";


export async function signUp(form: SignUpForm) {
    return httpClient.post("auth/signUp", JSON.stringify(form))
        .then((response) => JSON.parse(response.data) as ServerResponse<User>)
}
export async function signIn(form: SignInForm) {
    return httpClient.post("auth/signIn", JSON.stringify(form))
        .then((response) => JSON.parse(response.data) as ServerResponse<Token>)
}

export async function updateUser(form: Partial<User>) {
    return httpClient.put("auth/", JSON.stringify(form))
        .then((response) => JSON.parse(response.data) as ServerResponse<User>)
}

export async function me() {
    return httpClient.get("auth/me")
        .then((response) => JSON.parse(response.data) as ServerResponse<User>)
}


export async function allUsers() {
    return httpClient.get("admin/allUsers")
        .then((response) => {
            try { return JSON.parse(response.data) as ServerResponse<User[]>} 
            catch (e){
                throw response.data
            }
        })
}

export async function deleteUser(id: string) {
    return httpClient.delete(`admin/deleteUser/${id}`)
        .then((response) => {
            try { return JSON.parse(response.data) as ServerResponse<User>} 
            catch (e){
                throw response.data
            }
        })
}


export async function likeTrack(id: string) {
    return httpClient.patch(`auth/like/${id}`)
        .then((response) => {
            try { return JSON.parse(response.data) as ServerResponse<string[]>} 
            catch (e){
                throw response.data
            }
        })
}


export async function createPlaylist(name: string,tracks: string[]) {
    return httpClient.post(`playlists/new-playlist`, JSON.stringify({name, tracks}))
        .then((response) => {
            try { return JSON.parse(response.data) as ServerResponse<{_id:string, name:string, tracks:string[]}>} 
            catch (e){
                throw response.data
            }
        })
}


export async function deletePlaylist(playlistId:string) {
    return httpClient.delete(`playlists/delete-playlist/${playlistId}`)
        .then((response) => {
            try { return JSON.parse(response.data) as ServerResponse<{_id:string, name:string, tracks:string[]}>} 
            catch (e){
                throw response.data
            }
        })
}


export async function addTrackToPlaylist(playlistId:string, trackId:string) {
    return httpClient.patch(`playlists/add-track-to-playlist/${playlistId}/${trackId}`)
        .then((response) => {
            try { return JSON.parse(response.data) as ServerResponse<{_id:string, name:string, tracks:string[]}>} 
            catch (e){
                throw response.data
            }
        })
}


export async function deleteTrackFromPlaylist(playlistId:string, trackId:string) {
    return httpClient.delete(`playlists/delete-track-from-playlist/${playlistId}/${trackId}`)
        .then((response) => {
            try { return JSON.parse(response.data) as ServerResponse<{_id:string, name:string, tracks:string[]}>} 
            catch (e){
                throw response.data
            }
        })
}

