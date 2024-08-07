export const truncateTitle = (title, maxLength) => {
    if (title.length <= maxLength) {
        return title;
    }
    return title.slice(0, maxLength) + '...';
};