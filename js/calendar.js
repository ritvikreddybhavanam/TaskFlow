import { API_KEY, CLIENT_ID, DISCOVERY_DOCS, SCOPES } from './config.js';

let tokenClient;
export let gapiInited = false;
export let gsisInited = false;

export function initGoogleAPIs() {
    gapi.load('client', async () => {
        await gapi.client.init({ apiKey: API_KEY, discoveryDocs: DISCOVERY_DOCS });
        gapiInited = true;
    });

    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) console.log("Google sync Active");
        }
    });
    gsisInited = true;
}

export async function ensureGoogleAccess(userEmail) {
    return new Promise((resolve) => {
        const token = gapi.client.getToken();
        if (token && token.access_token) return resolve(true);
        tokenClient.callback = (resp) => resolve(!!resp.access_token);
        tokenClient.requestAccessToken({ prompt: '', hint: userEmail });
    });
}

function getEventResource(title, description, dateStr, timeStr) {
    const startIso = `${dateStr}T${timeStr}:00`;
    const startDate = new Date(startIso);
    const endDate = new Date(startDate.getTime() + (60 * 60 * 1000));
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return {
        'summary': title,
        'description': description,
        'start': { 'dateTime': startDate.toISOString(), 'timeZone': userTimeZone },
        'end': { 'dateTime': endDate.toISOString(), 'timeZone': userTimeZone }
    };
}

export async function createCalendarEvent(title, description, dateStr, timeStr) {
    try {
        const resource = getEventResource(title, description, dateStr, timeStr);
        const response = await gapi.client.calendar.events.insert({ 'calendarId': 'primary', 'resource': resource });
        return response.result.id;
    } catch (err) { return null; }
}

export async function updateCalendarEvent(eventId, title, description, dateStr, timeStr) {
    try {
        const resource = getEventResource(title, description, dateStr, timeStr);
        await gapi.client.calendar.events.patch({ 'calendarId': 'primary', 'eventId': eventId, 'resource': resource });
        return true;
    } catch (err) { return false; }
}

export async function deleteCalendarEvent(eventId) {
    try {
        await gapi.client.calendar.events.delete({ 'calendarId': 'primary', 'eventId': eventId });
    } catch (e) { console.error(e); }
}