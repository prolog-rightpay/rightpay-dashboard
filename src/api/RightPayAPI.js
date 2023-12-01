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

            const account = await this.getAccount()
            if (!account.is_admin) {
                await this.signout()
                this.sessionToken = null
                throw new RightPayAPIError("Account is not an admin.")
            }
        }
    }

    async signout() {
        const _ = await fetch(endpoint + "/signout", {
            headers: {
                "Authorization": "Bearer " + this.sessionToken
            }
        })
        this.sessionToken = null
    }

    async getAccount() {
        const res = await fetch(endpoint + "/account", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + this.sessionToken
            }
        })
        const json = await res.json()
        if (!json.success) {
            throw new RightPayAPIError(json.message)
        } else {
            return json.data.account
        }
    }

    async getIssuer(id) {
        const res = await fetch(endpoint + "/wallet/issuer/id/" + id + "?extended", {
            headers: {
                "Authorization": "Bearer " + this.sessionToken
            }
        })
        const json = await res.json()
        if (!json.success) {
            throw new RightPayAPIError(json.message)
        } else {
            return json.data
        }
    }

    async getIssuers() {
        const res = await fetch(endpoint + "/wallet/issuer?extended", {
            "headers": {
                "Authorization": "Bearer " + this.sessionToken
            }
        })
        const json = await res.json()
        if (!json.success) {
            throw new RightPayAPIError(json.message)
        } else {
            return json.data.issuers
        }
    }

    async newIssuer(name, bins) {
        const data = { name, bins }
        const res = await fetch(endpoint + "/wallet/issuer/new", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + this.sessionToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const json = await res.json()
        if (!json.success) {
            throw new RightPayAPIError(json.message)
        }
    }

    async updateIssuer(id, name, bins) {
        const data = { name, bins }
        const res = await fetch(endpoint + "/wallet/issuer/id/" + id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + this.sessionToken,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const json = await res.json()
        if (!json.success) {
            throw new RightPayAPIError(json.message)
        }
    }

}

export default RightPayAPI