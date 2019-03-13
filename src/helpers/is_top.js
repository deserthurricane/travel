export function is_top(place) {

    return ( parseInt(place, 10) % 2 === 0 ) ? true : false;

}


export function is_bottom(place) {

    return !is_top(place);

}
