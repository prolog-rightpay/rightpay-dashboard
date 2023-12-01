const endpoint = "http://localhost:3000/api/v1"

class RightPayAPIError extends Error {
    constructor(msg) {
        super(msg)
        this.name = "RightPayAPIError"
    }
}

class RightPayAPI {

    email = null
    sessionToken = null

    constructor(sessionToken = null) {
        this.sessionToken = sessionToken
    }

    setSessionToken(sessionToken) {
        this.sessionToken = sessionToken
    }

    async signin(email, password) {
        const data = { email, password }
        const res = await fetch(endpoint + "/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const json = await res.json()
        if (!json.success) {
            throw new RightPayAPIError(json.message)
        } else {
            const sessionToken = json.data.session_token
            this.email = email
            this.sessionToken = sessionToken
        }
    }

    async getIssuers() {
    
    }

}

export default RightPayAPI