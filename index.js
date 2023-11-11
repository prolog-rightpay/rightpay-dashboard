require("dotenv").config()

const { dbConnect } = require("./src/db")
const { initReferToken } = require("./src/auth")

const express = require("express")
const app = express()

dbConnect()
.then(async db => {
    try {
        const newToken = await initReferToken(db)
        console.log(`[info] system referral token for registration: ${newToken}`)
    } catch (err) {
        console.log(`[error] failed to init system referral token`)
        console.log(err)
    }
    
    app.set("db", db)
})
.catch(err => {
    console.log("[error] failed to connect to mongodb")
    console.log(err)
    process.exit(1)
})

app.set("view engine", "ejs")
app.use("/static", express.static("static"))

app.get("/dashboard/issuers", (req, res) => {
    const opts = {
        id: "issuers",
        title: "Global Issuers",
        subtitle: "0 issuers",
        new_url: "/dashboard/issuers/new",
        js: [
            "/static/js/dashboard/issuers.js"
        ]
    }
    res.render("table/global_issuers", opts)
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

app.get("/dashboard/paymentmethods", (req, res) => {
    const opts = {
        id: "payment_methods",
        title: "Global Payment Methods",
        subtitle: "0 global payment methods",
        new_url: "/dashboard/paymentmethods/new",
        js: [
            "/static/js/dashboard/issuers.js"
        ]
    }
    res.render("table/global_payment_methods", opts)
})

app.get("/dashboard/paymentmethods/new", (req, res) => {
    const opts = {
        id: "payment_methods",
        title: "New Global Payment Method",
        subtitle: "Create a new payment method",
        back_url: "/dashboard/paymentmethods",
        js: [
            "/static/js/dashboard/issuers.js"
        ]
    }
    res.render("new/global_payment_method", opts)
})

app.get("/dashboard/promotions", (req, res) => {
    const opts = {
        id: "cashback_promotions",
        new_url: "/dashboard/promotions/new",
        js: [
            "/static/js/table/cashback_promotions.js"
        ]
    }
    res.render("table/cashback_promotions", opts)
})

app.get("/dashboard/promotions/new/", (req, res) => {
    const opts = {
        id: "cashback_promotions",
        title: "New Cashback Promotion",
        subtitle: "Create a new cashback promotion",
        back_url: "/dashboard/promotions",
        js: [
            "/static/js/form.js",
            "/static/js/multiselect.js",
            "/static/js/new/cashback_promotion.js"
        ]
    }
    res.render("new/cashback_promotion", opts)
})

app.get("/signin", (req, res) => {
    const opts = {
        id: "signin",
        title: "Sign In",
        subtitle: "Sign in to account",
        js: []
    }
    res.render("account/signin", opts)
})

app.get("/signup", (req, res) => {
    const opts = {
        id: "signup",
        title: "Sign Up",
        subtitle: "Sign up for account",
        js: []
    }
    res.render("account/signup", opts)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`[info] listening on port ${port}`)
})
