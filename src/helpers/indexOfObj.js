



export const indexOfObj = (arr, property) => {
    for (var i = 0, len = arr.length; i < len; i++) {
        var if_find = true;
        
        for (var p in property )
            if ( if_find && ( arr[i][p] === undefined || arr[i][p] !== property[p]) )
                if_find = false;
        
        if ( if_find ) 
            return i;
    }
    return -1;
}



