function Panel({ children, className = '' }) {
    return (
        <div className={`relative bg-white shadow-md p-4 rounded-md ${className}`}>{children}</div>
    );
}

export default Panel;
