export const setPos = (setPosX, setPosY, allowedDirections) => {
    let x;
    let y;
    switch (allowedDirections) {
        case 'horizontal':
            x = setPosX;
            y = 0;
            break;
        case 'vertical':
            x = 0;
            y = setPosY;
            break;
        case 'all':
        default:
            x = setPosX;
            y = setPosY;
            break;
    }
    return { x, y };
};
export const getCurrentPos = (event) => {
    if (event instanceof MouseEvent) {
        return {
            x: event.clientX,
            y: event.clientY
        };
    }
    return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
    };
};
