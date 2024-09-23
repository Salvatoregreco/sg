function Panel({ children, className = '' }) {
    return <div className={`bg-white shadow-md p-4 rounded-md ${className}`}>{children}</div>;
}

export default Panel;
