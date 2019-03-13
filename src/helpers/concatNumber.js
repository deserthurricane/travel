


export function concatNumberLeft(numb, len = 8, add = '0') {
    numb = numb + '';
    
    while (numb.length < len)
        numb = add + numb;
    
    return numb;
}


export function concatNumberRight(numb, len = 8, add = '0') {
    numb = numb + '';
    
    while (numb.length < len)
        numb = numb + add;
    
    return numb;
}
