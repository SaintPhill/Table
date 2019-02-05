export function loadUsers(link) {
    return fetch(link)
        .then(response => response.json())
        .catch(() => {
            loadUsers()
        })
}