
import { SOURCES } from './../options';



export function setHtmlClass(source) {
    window.source = source;
    let root_ = document.documentElement;

    //  вначале отчищу все классы...
    for (var i = 0; i < SOURCES.length; i++) {
        if ( source !== SOURCES[i] )
            removeClass(root_, 'source-' + SOURCES[i]);
    }

    if ( !hasClass(root_, 'source-' + source) )
        addClass(root_, 'source-' + source);
}






function removeClass(el, className) {
    if ( el.classList )
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}




function addClass(el, className) {
    if ( el.classList )
        el.classList.add(className);
    else
        el.className += ' ' + className;
}


function hasClass(el, className) {
    if (el.classList)
        el.classList.contains(className);
    else
        new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}
