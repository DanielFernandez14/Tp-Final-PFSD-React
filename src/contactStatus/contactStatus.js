export function getContactStatus(contact) {
    if (!contact) return 'Desconectado';

    if (contact.isConected) {
        return 'En línea';
    }

    return 'Desconectado';
}
