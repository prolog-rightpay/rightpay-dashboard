const percentageTableBody = document.querySelector("#table-percentage tbody")
// const reimbursementTable = document.querySelector("#")

const multiClassList = "ps-2 pe-2 pt-1 pb-1 m-0 bg-primary rounded text-light me-1 mb-1"
function fillTable(data, tbody, type) {
    for (const item of data) {
        const tr = document.createElement("tr")
        
        // payment method
        var td = document.createElement("td")
        var a = document.createElement("a")
        a.href = "#"
        a.innerText = item.id || "Unknown"
        td.appendChild(a)
        tr.appendChild(td)

        td = document.createElement("td")
        td.innerText = item.payment_method?.name || "Unknown"
        tr.appendChild(td)

        if (type == "percentage") {
            // cashback percentage
            td = document.createElement("td")
            if (item.cashback_percentage) {
                td.innerText = item.cashback_percentage + "%"
            } else {
                td.innerText = "Unknown"
            }
            tr.appendChild(td)
        } else if (type == "reimbursement") {
            // reimbursement amount
            td = document.createElement("td")
            td.innerText = item.cashback_reimbursement || "Unknown"
            tr.appendChild(td)
        }

        // spending min
        td = document.createElement("td")
        if (item.spending_min) {
            td.innerText = "$" + item.spending_min
        }
        tr.appendChild(td)

        // spending max
        td = document.createElement("td")
        if (item.spending_max) {
            td.innerText = "$" + item.spending_max
        }
        tr.appendChild(td)

        // spending cycle
        td = document.createElement("td")
        td.innerText = item.spending_cycle || ""
        tr.appendChild(td)

        // enroll
        td = document.createElement("td")
        td.innerText = item.enrollment_required || "Unknown"
        tr.appendChild(td)

        // inclusions
        td = document.createElement("td")
        td.innerText = item.inclusions || "Unknown"
        tr.appendChild(td)

        // included businesses
        td = document.createElement("td")
        for (const category of item.included_categories || []) {
            const span = document.createElement("span")
            span.innerText = category
            span.className = multiClassList
            span.style.whiteSpace = "nowrap"
            td.appendChild(span)
        }
        tr.appendChild(td)

        // included business categories
        td = document.createElement("td")
        for (const category of item.included_businesses || []) {
            const span = document.createElement("span")
            span.innerText = category
            span.className = multiClassList
            span.style.whiteSpace = "nowrap"
            td.appendChild(span)
        }
        tr.appendChild(td)

        // exclusions
        td = document.createElement("td")
        td.innerText = item.exclusions || "Unknown"
        tr.appendChild(td)

        // excluded businesses
        td = document.createElement("td")
        for (const category of item.excluded_categories || []) {
            const span = document.createElement("span")
            span.innerText = category
            span.className = multiClassList
            span.style.whiteSpace = "nowrap"
            td.appendChild(span)
        }
        tr.appendChild(td)

        // included business categories
        td = document.createElement("td")
        for (const category of item.excluded_businesses || []) {
            const span = document.createElement("span")
            span.innerText = category
            span.className = multiClassList
            span.style.whiteSpace = "nowrap"
            td.appendChild(span)
        }
        tr.appendChild(td)

        // active from
        td = document.createElement("td")
        td.innerText = item.time_period_start || ""
        tr.appendChild(td)

        // active to
        td = document.createElement("td")
        td.innerText = item.time_period_end || ""
        tr.appendChild(td)

        // introductory to
        td = document.createElement("td")
        td.innerText = item.introductory_days || ""
        tr.appendChild(td)

        tbody.appendChild(tr)
    }
}

data = [
    {
        id: "8BB3CF0C-5D75-4EDC-B33B-185091587327",
        cashback_percentage: 50,
        cashback_type: "percentage",
        enrollment_required: true,
        excluded_businesses: ["two"],
        excluded_categories: ["office supplies"],
        exclusions: true,
        included_businesses: ["ex"],
        included_categories: ["gas station", "cafe", "resturant"],
        inclusions: true,
        introductory_days: 10,
        payment_method: {
            id: "aaa",
            name: "Chase Freedom"
        },
        spending_cycle: "annually",
        spending_max: 2000,
        spending_min: 1000,
        time_period_end: "2023-10-03T07:57:00.000Z",
        time_period_start: "2023-10-05T05:57:00.000Z",
    },{ id: "7914F055-E091-4549-95A7-A7A90AB5F609" }
]
fillTable(data, percentageTableBody, "percentage")