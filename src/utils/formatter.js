function formatDate(dd) {
    const date = new Date(dd);
    d = date.getDate();
    m = date.getMonth() + 1;
    y = date.getFullYear();
    return `${d}-${m}-${y}`;
}
function changeDisplayRoleType(r){
    return r == 0 ? 'Student' : r == 1 ? 'Teacher' : r == 2 ? 'Admin' : 'Anonymos';
}

module.exports = {
    formatDate,
    changeDisplayRoleType,
}