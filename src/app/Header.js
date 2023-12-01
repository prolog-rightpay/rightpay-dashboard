import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ currentPage }) => {
    return (
        <header className="p-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    {/* <div className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none">
                        <p>Example</p>
                    </div> */}
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="/issuers" className={`nav-link px-2 ${currentPage == 'issuers' ? 'text-secondary' : ''}`}>Issuers</a></li>
                        <li><a href="/paymentmethods" className={`nav-link px-2 ${currentPage == 'payment_methods' ? 'text-secondary' : ''}`}>Payment Methods</a></li>
                        <li><a href="/promotions" className={`nav-link px-2 ${currentPage == 'cashback_promotions' ? 'text-secondary' : ''}`}>Cashback Promotions</a></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}
export default Header
