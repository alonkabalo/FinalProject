import dotenv from 'dotenv'
import axios from 'axios'

import fs from 'fs'
dotenv.config()


const getTracks = async (ids: string[]) => {
  const options = {
    method: 'GET',
    url: `https://spotify81.p.rapidapi.com/tracks`,
    params: {
      ids: ids.join(","),
    },
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST
    }
  };
  
  try {
      const response = await axios.request(options);
      return response.data.tracks.map((track:any) =>  {
        track.tid = track.id;
        delete track.id;
        return track
      })
  } catch (error) {
      console.error(error);
      return {"results": []}
  }
} 

const search = async (q: string) => {
    const options = {
      method: 'GET',
      url: 'https://spotify81.p.rapidapi.com/search',
      params: {
        q,
        type: 'multi',
        offset: '0',
        limit: '10',
        numberOfTopResults: '5'
      },
      headers: {
        'X-RapidAPI-Key': process.env.API_KEY,
        'X-RapidAPI-Host': process.env.API_HOST
      }
    };
    
    try {
        const response = await axios.request(options);

        fs.writeFileSync("results.json",JSON.stringify(response.data), "utf8")
        return response.data
    } catch (error) {
        console.error(error);
        return {"results": []}
    }
} 


export { search, getTracks }