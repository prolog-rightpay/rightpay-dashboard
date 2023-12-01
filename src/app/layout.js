// import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header'

export default function RootLayout({ children, currentPage }) {
    return (
        <>
            <Header currentPage={currentPage} />
            <div className="container">
                {children}
            </div>
            
        </>
    )
}
    