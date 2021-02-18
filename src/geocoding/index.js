import axios from 'axios'
import {keyMap} from '../constants'

const client = axios.create({
    baseURL:"https://maps.googleapis.com/maps/api/geocode/",
    params: {key: keyMap}
})

export const getLocations = async(address)=>{
    const data = await client.get("json", {params:{address}})
    return data.data.results
}