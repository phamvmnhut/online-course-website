$('thead th .sort-icon').hide();
$('thead .sort-col').click(function() {
    $('thead th .sort-icon').hide();
    svg = $(this).find('svg');
    svg.show();
    var table = $(this).parents('table').eq(0)
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
    this.asc = !this.asc
    rotateDeg = 0;
    if (!this.asc) {
        rows = rows.reverse();
        rotateDeg = 180;
    }
    svg.css('transform', `rotate(${rotateDeg}deg)`);
    for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
})

function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index),
            valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
}

function getCellValue(row, index) {
    return $(row).children('th, td').eq(index).text() }
