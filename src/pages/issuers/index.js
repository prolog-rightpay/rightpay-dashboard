import TableHeader from "@/app/TableHeader"
import RootLayout from "@/app/layout"
import withAuth from "@/auth/withAuth"
import { useEffect, useState } from "react"
import { useAuth } from "@/auth/AuthContext"

const IssuersPage = () => {

    const { api } = useAuth()
    const [issuers, setIssuers] = useState([])

    useEffect(() => {
        api.getIssuers()
        .then(issuers => {
            setIssuers(issuers)
        })
        .catch(err => {
            if (err.name == "RightPayAPIError") {
                alert(err.message)
            } else {
                console.log(err)
            }
        })
    }, [])

    return (
        <RootLayout currentPage="issuers">
            <TableHeader
                title="Global Issuers"
                subtitle="Global issuers issue credit cards, not to be confused with payment networks (e.g. Visa or Mastercard)."
                buttonTitle="New" 
                buttonURL="/issuers/new" />
            <div style={{overflowY: "scroll"}}>
                <table className="table mt-3" style={{minWidth:500}}>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Options</th>
                            <th scope="col">ID</th>
                            <th scope="col">Payment Methods</th>
                            <th scope="col">BINs</th>
                            <th scope="col">Thumbnail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issuers.map(item => (
                            <tr key={item.id}>
                                <th scope="row">{item.name}</th>
                                <td><a href={"/issuers/edit?id=" + item.id}>Edit</a></td>
                                <td>{item.id}</td>
                                <td>{item.payment_methods.length}</td>
                                <td>{item.bins.join(", ")}</td>
                                <td>{item.thumbnail_image_url || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </RootLayout>
    )
}
export default withAuth(IssuersPage)
