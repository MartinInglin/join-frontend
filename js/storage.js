const STORAGE_TOKEN = 'DXEPN5WHNSN7FWTP63KN6TPBPJDYD9Z86DTGGSG0';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = {key, value, token: STORAGE_TOKEN};
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json()); //Antwort des Servers, zum Beispiel "Error" usw. wird in JSON umgewandelt

}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`; //url wird definiert, mit & werden verschiedene Variablen hintereinander gehängt
    return fetch(url).then(res => res.json()).then(res => res.data.value); //Daten werden geladen und in JSON umgewandelt, dann (bei Erfolg) nur die Daten laden
}