const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"

async function dbConnect() {
    const client = new MongoClient(uri)
    await client.connect()

    const db = client.db("rightpay_dashboard")
    return db
}
exports.dbConnect = dbConnect
