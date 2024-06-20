import axios from 'axios';

const PIXABAY_API_KEY = '44453286-ef9a77763c4a9e1194372640c';

export const getImages = async (query, type = 'photo', per_page =  3) => {
    const response = await axios.get('https://pixabay.com/api/', {
        params: {
            key : PIXABAY_API_KEY,
            q: query,
            image_type: type,
            category: type == 'map' ? 'place' : '',
            per_page: per_page
        }
    });
    
    return response.data.hits;
}