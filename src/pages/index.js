import RootLayout from "@/app/layout"
import withAuth from "@/auth/withAuth"

const HomePage = () => {
    return (
        <RootLayout currentPage="home">
            <p>home page</p>
        </RootLayout>
    )
}

export default withAuth(HomePage)
