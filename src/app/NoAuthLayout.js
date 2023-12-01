import 'bootstrap/dist/css/bootstrap.min.css';

const NoAuthLayout = ({ children }) => {
    return (
        <>
            <div className="container">
                {children}
            </div>
        </>
    )
}
export default NoAuthLayout
