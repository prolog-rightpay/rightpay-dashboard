import 'bootstrap/dist/css/bootstrap.min.css';

const TableHeader = ({ title, subtitle, buttonTitle, buttonURL, buttonType }) => {
    return (
        <div className="d-flex align-items-center justify-content-between mt-3">
            <div>
                <h3 className="mb-0">{title}</h3>
                <p className="text-secondary mt-0 mb-0">{subtitle}</p>
            </div>
            {buttonTitle ? <a className={`btn ${buttonType == 'light' ? 'btn-light' : 'btn-primary'}`} href={buttonURL} role="button">{buttonTitle}</a> : ''}
        </div>
    )
}
export default TableHeader
