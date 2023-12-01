import TableHeader from "@/app/TableHeader"
import RootLayout from "../../app/layout"

const CashbackPromotionsPage = () => {
    return (
        <RootLayout currentPage="cashback_promotions">
            <TableHeader
                title="Percentage Promotions"
                subtitle="Cashback promotions that reward through a percentage model."
                buttonTitle="New"
                buttonURL="/promotions/new" />
            <div style={{overflowY: "scroll"}}>
                <table className="table mt-3 mb-5" style={{width: 3000}}>
                    <thead>
                        <tr>
                            <th scope="col" className={{width: 365}}>ID</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Cashback %</th>
                            <th scope="col">Spending Min $</th>
                            <th scope="col">Spending Max $</th>
                            <th scope="col">Spending Cycle</th>
                            <th scope="col">Enroll</th>
                            <th scope="col">Inclusions</th>
                            <th scope="col">Included Categories</th>
                            <th scope="col">Included Businesses</th>
                            <th scope="col">Exclusions</th>
                            <th scope="col">Excluded Categories</th>
                            <th scope="col">Excluded Businesses</th>
                            <th scope="col">Active From</th>
                            <th scope="col">Active To</th>
                            <th scope="col">Introductory Days</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </RootLayout>
    )
}
export default CashbackPromotionsPage
