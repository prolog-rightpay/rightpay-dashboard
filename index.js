const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.use(express.static("static"))

app.get("/dashboard/issuers", (req, res) => {
    const opts = {
        id: "issuers",
        title: "Global Issuers",
        subtitle: "0 issuers",
        new_url: "/dashboard/issuers/new",
        table: {
            headers: [ "Name", "ID", "BINs", "Thumbnail" ]
        },
        js: [
            "/static/js/dashboard/issuers.js"
        ]
    }
    res.render("table", opts)
})

app.get("/dashboard/issuers/new", (req, res) => {
    const opts = {
        id: "issuers",
        title: "New Global Issuer",
        subtitle: "Create a new global issuer",
        back_url: "/dashboard/issuers",
        js: [
            "/static/js/dashboard/issuers.js"
        ]
    }
    res.render("new/global_issuer", opts)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`web app listening on port ${port}`)
})
