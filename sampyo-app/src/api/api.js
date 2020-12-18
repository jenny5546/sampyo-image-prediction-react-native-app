import axios from 'axios';

// Backend Api
// const baseUrl = 'http://192.168.35.27:8000';
const baseUrl = 'https://shielded-sierra-26661.herokuapp.com/';


var api = axios.create({
	baseURL: baseUrl,
	headers: { 
        'accept': 'application/json',
        'content-type': 'multipart/form-data'
    },
    withCredentials: true
});

export function getResults() {
    return api.get('/');
}

export function sendImageForAutoCrop(form) {
    return api.post('/crop/', form);
}

export function sendRawImageForBrightness(form) {
    return api.post('/brightness/', form);
}

export function renderPredictionResult(form) {
    return api.post('/prediction/', form);
}

export function savePredictionLabel(form) {
    return api.post('/label/',form);
}

export function deletePrediction(form) {
    return api.post('/delete/',form);
}

export function deleteAll() {
    return api.get('/deleteAll/');
}