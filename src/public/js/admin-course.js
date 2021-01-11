ldsRollerStop();

function removeCourse(id) {
    $.ajax({
        method: 'delete',
        url: '/api/course/' + id,
    }).done(function(res) {
        console.log(res);
        ldsRollerStop();
        if (res.status) {
            window.location = window.location.pathname;
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Thao tác thất bại',
                text: res.err || 'Something went wrong!',
            });
        }
    }).fail(function(err) {
        ldsRollerStop()
        showMessageError(err.message);
    });
}