import TableHeader from "@/app/TableHeader"
import RootLayout from "@/app/layout"

const data = [
    {
        name: "Chase",
        id: "4F768A3B-0781-4688-AC22-D91B9A684B7A",
        bins: ["283283", "283748"],
        thumbnail: null
    }
]

const IssuersPage = () => {
    return (
        <RootLayout currentPage="issuers">
            <TableHeader
                title="Global Issuers"
                subtitle="Subtitle"
                buttonTitle="New" 
                buttonURL="/issuers/new" />
            <div style={{overflowY: "scroll"}}>
                <table className="table mt-3" style={{minWidth:500}}>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">ID</th>
                            <th scope="col">BINs</th>
                            <th scope="col">Thumbnail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <th scope="row">{item.name}</th>
                                <td>{item.id}</td>
                                <td>{item.bins.join(", ")}</td>
                                <td>{item.thumbnail || "N/A"}</td>
                            </tr>
                        ))}                        
                    </tbody>
                </table>
            </div>
        </RootLayout>
    )
}
export default IssuersPage
