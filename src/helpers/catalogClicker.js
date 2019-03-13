import Modal    from 'srk/lib/components/Modal';
import { is_catalog } from './is';


export function catalogClicker( e ) {

    if ( is_catalog() ) {
        e.preventDefault();

        let el = e.target;
        let href = el.getAttribute('href');

        Modal.iframe({src: href});
    }

}
