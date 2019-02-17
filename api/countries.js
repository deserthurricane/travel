import client, { routes } from './common';

export function getCountries() {
    return client.get(routes.countries);
}