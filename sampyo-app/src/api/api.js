import axios from 'axios';

// Backend Api
const baseUrl = 'http://192.168.35.196:8000';

var api = axios.create({
	baseURL: baseUrl,
	header: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    }
});

export function getFeeds() {
    return api.get('/')
}


