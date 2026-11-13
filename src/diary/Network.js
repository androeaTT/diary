import { invoke } from '@tauri-apps/api/core';

function serializeQuery(params) {
    const entries = Object.entries(params);
    return entries.length > 0
        ? entries.map(([key, value]) => [key, String(value)])
        : null;
}

export default class Network {
    isTauri
    address = "http://" + window.location.hostname + ":34006"

    constructor() {
        this.isTauri = window.__TAURI_INTERNALS__ !== undefined
    }

    async login(username, password) {
        let text

        if (this.isTauri) {
            text = await invoke('login', {
                url: 'https://kundoluk.edu.gov.kg/api/auth/loginStudent',
                credentials: {
                    username: username,
                    password: password,
                },
            })
        } else {
            const response = await fetch(this.address + "/api/auth/loginStudent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })

            text = await response.text()
        }

        return text
    }

    async getQmarks(token, params = {}) {
        if (this.isTauri) {
            return await invoke('get_qmarks', {
                auth: token,
                query: serializeQuery(params),
            });
        } else {
            const url = new URL(this.address + "/api/student/qmarks/all");
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: { "Authorization": token },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error ?? `Request failed with status ${response.status}`);
            }
            return data;
        }
    }

    async getGradeList(token, params = {}) {
        if (this.isTauri) {
            return await invoke('get_grade_list', {
                auth: token,
                query: serializeQuery(params),
            });
        } else {
            const url = new URL(this.address + "/api/student/gradebook/list");
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: { "Authorization": token },
            });
            return await response.json();
        }
    }

    async getGradeterm1(token, params = {}) {
        if (this.isTauri) {
            return await invoke('get_grade_term_1', {
                auth: token,
                query: serializeQuery(params),
            });
        } else {
            const url = new URL(this.address + "/api/student/gradebook/term/1");
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: { "Authorization": token },
            });
            return await response.json();
        }
    }

    async getGradeterm2(token, params = {}) {
        if (this.isTauri) {
            return await invoke('get_grade_term_2', {
                auth: token,
                query: serializeQuery(params),
            });
        } else {
            const url = new URL(this.address + "/api/student/gradebook/term/2");
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: { "Authorization": token },
            });
            return await response.json();
        }
    }

    async getGradeterm3(token, params = {}) {
        if (this.isTauri) {
            return await invoke('get_grade_term_3', {
                auth: token,
                query: serializeQuery(params),
            });
        } else {
            const url = new URL(this.address + "/api/student/gradebook/term/3");
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: { "Authorization": token },
            });
            return await response.json();
        }
    }

    async getGradeterm4(token, params = {}) {
        if (this.isTauri) {
            return await invoke('get_grade_term_4', {
                auth: token,
                query: serializeQuery(params),
            });
        } else {
            const url = new URL(this.address + "/api/student/gradebook/term/4");
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
            const response = await fetch(url.toString(), {
                method: "GET",
                headers: { "Authorization": token },
            });
            return await response.json();
        }
    }
}

export const sNetwork = new Network();