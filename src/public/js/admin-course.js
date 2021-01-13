ldsRollerStop();

function removeCourse(id) {
    $.ajax({
        method: 'delete',
        url: '/api/course/' + id,
    }).done(function(res) {
        ldsRollerStop();
        if (res.status) {
            location.reload();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: res.err || 'Unknown error has occurred!',
            });
        }
    }).fail(function(err) {
        ldsRollerStop()
        showMessageError(err.message);
    });
}