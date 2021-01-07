function formatDate(dd) {
    const date = new Date(dd);
    d = date.getDate();
    m = date.getMonth() + 1;
    y = date.getFullYear();
    return `${d}-${m}-${y}`;
}
function changeDisplayRoleType(r){
    return r == 0 ? 'Học viên' : r == 1 ? 'Giảng viên' : r == 2 ? 'Admin' : '?';
}

module.exports = {
    formatDate,
    changeDisplayRoleType,
}