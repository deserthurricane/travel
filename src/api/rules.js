import client, { routes } from './common';


export function getDictionary(alias) {
    return client.get(routes.dictionary(alias));
}

export function getDictionariesPack(type) {
    return client.get(routes.dictionariesPack(type));
}