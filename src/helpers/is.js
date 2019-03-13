import _ from 'underscore';
import { OPERATOR_SOURCES, MOBILE_SOURCES } from './../options';



export function is_operator( source = false ) {
    source = source || window.source;
    
    return ( source && _.indexOf(OPERATOR_SOURCES, source.trim())+1 ) ? true : false;
}



export function is_online( source = false ) {
    source = source || window.source;

    return ( source && _.indexOf(OPERATOR_SOURCES, source.trim())+1 ) ? false : true;
}


export function is_mobile( source = false ) {
    source = source || window.source;

    return ( source && _.indexOf(MOBILE_SOURCES, source.trim())+1 ) ? true : false;
}



export function is_catalog( source = false ) {
    source = source || window.source;

    return ( source && source.trim() === 'catalog' ) ? true : false;
}



export function is_portal( source = false ) {
    source = source || window.source;

    return ( is_catalog(source) || is_mobile(source) );
}



export function is_svyaznoy( brand = false ) {
    brand = brand || window.brand;

    return (brand === 'svyaznoy');
}


export function is_euroset( brand = false ) {
    brand = brand || window.brand;

    return (brand === 'euroset');
}


