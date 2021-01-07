var editingStyle = 0;
var editingUserID = -1;

function showDetail(userID) {
    ldsRollerStart();
    $.ajax({
        method: 'get',
        url: `/admin/user/${userID}`,
    }).done(function(res) {
        ldsRollerStop();
        editingUserID = userID;
        showNewForm();
        disableUserForm();
        setFormData(res);
        showEditRemoveBtn();
        $('#register-btn').hide();
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
    const url = editingStyle === 1 ? '/admin/user/add' :
        editingStyle === 2 ? '/admin/user/update' : '/admin/user/remove';

    user = getFormData();
    if (editingStyle !== 1) {
        user.ID = editingUserID;
    }
    ldsRollerStart();
    $.ajax({
        method: 'post',
        url: url,
        data: user,
    }).done(function(res) {
        ldsRollerStop();
        hideUserForm();
        reloadData(res);
    }).fail(function(err) {
        ldsRollerStop()
        showMessageError(err.message);
    });
}

function showNewForm() {
    //  data-toggle="modal" data-target="#userFormModal"
    editingStyle = 1;
    enableUserForm();
    setFormData({ Name: '', Email: '', Password: '', Wallet: 0, DateCreated: new Date(), Role: 0 })
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
    setUserFormDisabled({ name: false, email: false, password: true, wallet: false, datecreated: true, role: true });

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
    userForm.name.disabled = true;
    userForm.email.disabled = true;
    userForm.password.disabled = true;
    userForm.wallet.disabled = true;
    userForm.datecreated.disabled = true;
    userForm.role.disabled = true;
}

function enableUserForm() {
    userForm.name.disabled = false;
    userForm.email.disabled = false;
    userForm.password.disabled = false;
    userForm.wallet.disabled = false;
    userForm.datecreated.disabled = true;
    userForm.role.disabled = false;
}

function setUserFormDisabled(formDisabled) {
    userForm.name.disabled = formDisabled.name;
    userForm.email.disabled = formDisabled.email;
    userForm.password.disabled = formDisabled.password;
    userForm.wallet.disabled = formDisabled.wallet;
    userForm.datecreated.disabled = formDisabled.datecreated;
    userForm.role.disabled = formDisabled.role;
}

function setFormData(user) {
    userForm.name.value = user.Name;
    userForm.email.value = user.Email;
    userForm.password.value = user.Password;
    userForm.wallet.value = user.Wallet;
    userForm.datecreated.valueAsDate = new Date(user.DateCreated);
    userForm.role.value = user.Role;
}

function getFormData() {
    username = userForm.name.value;
    email = userForm.email.value;
    password = userForm.password.value;
    wallet = userForm.wallet.value;
    datecreated = userForm.datecreated.value;
    role = userForm.role.value;

    user = { Name: username, Email: email, Password: password, Wallet: wallet, DateCreated: datecreated, Role: role };
    user.Avatar = 'adbX.jpg';
    return user;
}

function showMessageError(message) {
    alert(message)
}

function reloadData(res) {
    $('#main-table tbody').empty();
    $('#main-table tbody').append(res);
}

ldsRollerStop();
$('#input-edit-avt').change(function() {
    changeAvatarPreview(this);
});

$('thead th svg').hide();
$('thead th').click(function() {
    $('thead th svg').hide();
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

function getCellValue(row, index) { return $(row).children('td').eq(index).text() }