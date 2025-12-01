const SkeletonLoader: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div
            className={`bg-card-hover animate-pulse rounded ${className}`}
            style={{ minHeight: '1em' }} // Ensures the div is visible even if h-X isn't defined
        />
    );
};

export default SkeletonLoader;