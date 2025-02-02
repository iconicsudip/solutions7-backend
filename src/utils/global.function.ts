import axios from "axios"
const UNSPLAHS_ACCESS_KEY = process.env.UNSPLAHS_ACCESS_KEY

export const getUnsplshImage = async (query: string) => {
    const images = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${UNSPLAHS_ACCESS_KEY}`);
    return images.data
}