const crypto = require("crypto")
const bcrypt = require("bcrypt")

/**
 * Generate a secure token.
 * @returns {Promise<string>} Secure token string.
 */
 function generateToken() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(24, (err, buffer) => {
            if (err) { reject(err) }
            else { resolve(buffer.toString("hex")) }
        })
    })
}

async function newReferToken(db, source = undefined, parentReferToken = undefined) {
    const referTokenCol = db.collection("refer_tokens")

    if (source != "system" && source != "user") {
        throw new Error("Invalid source given")
    }

    const token = await generateToken()
    await referTokenCol.insertOne({
        token: token,
        source: source,
        parentReferToken: parentReferToken
    })
    return token
}
exports.newReferToken = newReferToken

/**
 * Create a new system referral token, IF one doesn't already exist and return it. Else return the existing system token.
 * @param {*} db 
 * @param {*} force 
 * @returns 
 */
async function initReferToken(db, force = false) {
    const referTokenCol = db.collection("refer_tokens")
    const existing = await referTokenCol.findOne({ source: "system" })
    if (existing != undefined && !force) {
        return existing.token
    }
    return await newReferToken(db, "system")
}
exports.initReferToken = initReferToken

async function validateReferToken(db, referToken) {
    const referTokenCol = db.collection("refer_tokens")
    const existing = await referTokenCol.findOne({ token: referToken })
    return existing != undefined
}

/**
 * Create a new account in the database.
 * @param {*} db MongoDB client.
 * @param {*} username Desired username.
 * @param {*} password Desired password.
 * @param {*} referToken Referral token required for registration.
 * @returns {string} UUID of new account.
 */
async function newAccount(db, username, password, referToken) {
    const accountsColl = db.collection("accounts")

    const validReferToken = await validateReferToken(db, referToken)
    if (!validReferToken) {
        throw new Error("Invalid referral token")
    }

    const existing = await accountsColl.findOne({ username: username })
    if (existing != null) {
        throw new Error("Username already exists")
    }

    const userId = uuidv4()
    const dateCreated = new Date()
    const hashedPassword = await bcrypt.hash(password, bcryptSaltRounds)
    await accountsColl.insertOne({
        id: userId,
        username: username,
        password: hashedPassword,
        date_created: dateCreated,
        source_refer_token: referToken
    })
    return userId
}
exports.newAccount = newAccount
