function showDetail(userID) {
    $.ajax( {
        method: 'get',
        url: `/admin/user/${userID}`,
        }
    ).done(function(res){
        console.log(res);
        $('#userFormModal').modal('show');
        const date = new Date(res.DateCreated);
        userForm.name.disabled = true;
        userForm.email.disabled = true;
        userForm.password.disabled = true;
        userForm.wallet.disabled = true;
        userForm.datecreated.disabled = true;
        userForm.role.disabled = true;

        userForm.name.value = res.Name; 
        userForm.email.value = res.Email; 
        userForm.password.value = res.Password; 
        userForm.wallet.value = res.Wallet; 
        userForm.datecreated.valueAsDate = date;
        userForm.role.value = res.Role; 
    }).fail(function(err){
        console.log(err);
    })
}

$('#input-edit-avt').change(function() {
    changeImage(this);
});

function changeImage(input) {
    var reader;
    console.log('change');
    if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function(e) {
            console.log(e.target.result);
            $('#avt-preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function submitUserForm(){
    console.log('submit');
}