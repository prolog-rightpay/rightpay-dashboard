import TableHeader from "@/app/TableHeader"
import RootLayout from "@/app/layout"
import withAuth from "@/auth/withAuth"

const data = [
    {
        name: "American Express Platinum",
        id: "4F768A3B-0781-4688-AC22-D91B9A684B7A",
        issuer: {
            name: "American Express"
        },
        payment_type: "credit",
        bin: "283748",
        network_type: "American Express",
        date_created: "2023-10-17T22:44:07.596Z",
        date_modified: "2023-10-17T22:44:07.596Z",
        image: null,
        promotions: [0,0,0,0,0,0,0]
    }
]

const PaymentMethodsPage = () => {
    return (
        <RootLayout currentPage="payment_methods">
            <TableHeader
                title="Payment Methods"
                subtitle="Subtitle"
                buttonTitle="New" 
                buttonURL="/paymentmethods/new" />
            <div style={{overflowY: "scroll"}}>
                <table className="table mt-3" style={{width: 2000}}>
                    <thead>
                        <tr>
                            <th scope="col" >Name</th>
                            <th scope="col">ID</th>
                            <th scope="col">Issuer (name)</th>
                            <th scope="col">Payment Type</th>
                            <th scope="col">BIN</th>
                            <th scope="col">Network Type</th>
                            <th scope="col">Date Created</th>
                            <th scope="col">Date Modified</th>
                            <th scope="col">Image</th>
                            <th scope="col">No. Promotions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th scope="row">{item.name}</th>
                                <td>{item.id}</td>
                                <td>{item.issuer.name}</td>
                                <td>{item.payment_type}</td>
                                <td>{item.bin}</td>
                                <td>{item.network_type}</td>
                                <td>{item.date_created}</td>
                                <td>{item.date_modified}</td>
                                <td>{item.image || "N/A"}</td>
                                <td>{item.promotions.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </RootLayout>
    )
}
export default withAuth(PaymentMethodsPage)
