export function getRedirectPath({ team, avatar }) {
    let url = team === 'warriors' ? '/raptors' : '/warriors' ;
    if (!avatar) {
        url = 'userInfo';
    }
    return url;
}

export function getChatId(userId, targetId) {
    return [userId, targetId].sort().join('_');
}