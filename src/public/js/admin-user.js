var editingStyle = 0;
var editingUserID = -1;

function showDetail(userID) {
    ldsRollerStart();
    $.ajax({
        method: 'get',
        url: `/api/user/${userID}`,
    }).done(function(res) {
        console.log(res);
        ldsRollerStop();
        if (res.status) {
            editingUserID = userID;
            showNewForm();
            disableUserForm();
            setFormData(res.user);
            showEditRemoveBtn();
            $('#register-btn').hide();
        }
    }).fail(function(err) {
        ldsRollerStop();
        showMessageError(err.message)
    })
}

function changeAvatarPreview(input) {
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

function submitUserForm() {

    if (editingStyle < 1 || editingStyle > 3) {
        return;
    }
    user = getFormData();
    user.ID = editingUserID;
    const method = editingStyle === 1 ? 'post' : editingStyle === 2 ? 'patch' : 'delete';
    var url = '/api/user/';
    if (method !== 'post') {
        url += user.ID;
    }
    ldsRollerStart();
    $.ajax({
        method: method,
        url: url,
        data: user,
    }).done(function(res) {
        console.log(res);
        ldsRollerStop();
        hideUserForm();
        if (res.status) {
            // window.location = window.location.pathname;
            location.reload();
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

function showNewForm() {
    //  data-toggle="modal" data-target="#userFormModal"
    editingStyle = 1;
    enableUserForm();
    setFormData({ FirstName: '', LastName: '', Email: '', Password: '', Wallet: 0, DateCreated: new Date(), Role: 0 })
    hideEditRemoveBtn();
    $('#register-btn').show();
    $('#userFormModal').modal('show');
}

function hideUserForm() {
    editingUserID = -1;
    editingStyle = 0;
    $('#userFormModal').modal('hide');
}

function editUser() {
    editingStyle = 2;
    setUserFormDisabled({ firstName: false, lastName: false, email: false, password: true, wallet: false, dateCreated: true, role: true });

    $('#register-btn').html('Lưu');
    $('#register-btn').show();
    hideEditRemoveBtn();
    ldsRollerStop();
}

function removeUser() {
    editingStyle = 3;
    console.log('Remove');

    hideEditRemoveBtn();
    submitUserForm();
}

function hideEditRemoveBtn() {
    $('#edit-btn').hide();
    $('#remove-btn').hide();
}

function showEditRemoveBtn() {
    $('#edit-btn').show();
    $('#remove-btn').show();
}

function disableUserForm() {
    userForm.firstName.disabled = true;
    userForm.lastName.disabled = true;
    userForm.email.disabled = true;
    userForm.password.disabled = true;
    userForm.wallet.disabled = true;
    userForm.dateCreated.disabled = true;
    userForm.role.disabled = true;
}

function enableUserForm() {
    userForm.firstName.disabled = false;
    userForm.lastName.disabled = false;
    userForm.email.disabled = false;
    userForm.password.disabled = false;
    userForm.wallet.disabled = false;
    userForm.dateCreated.disabled = true;
    userForm.role.disabled = false;
}

function setUserFormDisabled(formDisabled) {
    userForm.firstName.disabled = formDisabled.firstName;
    userForm.lastName.disabled = formDisabled.lastName;
    userForm.email.disabled = formDisabled.email;
    userForm.password.disabled = formDisabled.password;
    userForm.wallet.disabled = formDisabled.wallet;
    userForm.dateCreated.disabled = formDisabled.dateCreated;
    userForm.role.disabled = formDisabled.role;
}

function setFormData(user) {
    console.log(user);
    userForm.firstName.value = user.FirstName;
    userForm.lastName.value = user.LastName;
    userForm.email.value = user.Email;
    // userForm.password.value = user.Password;
    userForm.wallet.value = user.Wallet;
    userForm.dateCreated.valueAsDate = new Date(user.DateCreated);
    userForm.role.value = user.Role;
}

function getFormData() {
    firstName = userForm.firstName.value;
    lastName = userForm.lastName.value;
    email = userForm.email.value;
    password = userForm.password.value;
    wallet = userForm.wallet.value;
    dateCreated = userForm.dateCreated.value;
    role = userForm.role.value;

    user = { FirstName: firstName, LastName: lastName, Email: email, Password: password, Wallet: wallet, DateCreated: dateCreated, Role: role };
    user.Avatar = 'adbX.jpg';
    return user;
}

function showMessageError(message) {
    alert(message)
}

// --------

function formatDate(dd) {
    const date = new Date(dd);
    d = date.getDate();
    m = date.getMonth() + 1;
    y = date.getFullYear();
    return `${d}-${m}-${y}`;
}

function changeDisplayRoleType(r) {
    return r == 0 ? 'Học viên' : r == 1 ? 'Giảng viên' : r == 2 ? 'Admin' : '?';
}

// -----

ldsRollerStop();
$('#input-edit-avt').change(function() {
    changeAvatarPreview(this);
});