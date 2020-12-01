import axios from 'axios';

// Backend Api
const baseUrl = 'http://192.168.35.196:8000';

var api = axios.create({
	baseURL: baseUrl,
	headers: { 
        'accept': 'application/json',
        'content-type': 'multipart/form-data'
    },
    withCredentials: true
});

// export function getResults() {
//     return api.get('/')
// }

export function sendRawImageToServer(form) {
    return api.post('/results/request/', form);
}


