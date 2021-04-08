class APIClient {
    constructor(endpointUrl) {
        this.endpointUrl = endpointUrl
    }

    // Example POST method implementation:
    async postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch((this.endpointUrl + url), {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        return response.json() // parses JSON response into native JavaScript objects
    }

    async getData(path = '', data = {}) {
        const url = new URL(this.endpointUrl + path)
        const keys = Object.keys(data)
        const values = Object.values(data)
        for (let i = 0; i < values.length; i++) {
            let value = values[i]
            if (typeof value == 'object') {
                value = JSON.stringify(value)
            }
            url.searchParams.set(keys[i], value)
        }
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
        return response.json()
    }

    ping(host) {
        return this.postData('/ping/single', { host })
    }

    getDataForChart() {
        return this.getData('/chart/ping');
    }
}