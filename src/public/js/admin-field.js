ldsRollerStop();
var method = '';

function showDetail(id) {
    ldsRollerStart();
    $.ajax({
        method: 'get',
        url: `/api/cat-field/${id}`
    }).done(function(res){
        ldsRollerStop();
        disableForm();
        showEditRemoveBtn();
        hideRegisterBtn();
        setFormData(res.field)
        showForm();

    }).fail(function(res){
        ldsRollerStop();
    });
}

function editBtnClicked(){
    method = 'patch';
    enableForm();
    hideEditRemoveBtn();
    $('#register-btn').html('Save');
    showRegisterBtn();
}

function removeBtnClicked(){
    method = 'delete';
    submitForm();
}

function disableForm(){
    mainForm.id.disabled = true;
    mainForm.cat.disabled = true;
    mainForm.name.disabled = true;
    mainForm.des.disabled = true;
}

function enableForm(){
    mainForm.id.disabled = true;
    mainForm.cat.disabled = true;
    mainForm.name.disabled = false;
    mainForm.des.disabled = false;
}



function showNewForm(){
    method = 'post';
    setFormData({FieldID:'', FieldName:'', FieldDescription:''})
    enableForm();
    hideEditRemoveBtn();
    showRegisterBtn();
    showForm();
}

function showForm(){
    $('#mainFormModal').modal('show');
}

function hideForm() {
    method = '';
    $('#mainFormModal').modal('hide');
}
function hideEditRemoveBtn() {
    $('#edit-btn').hide();
    $('#remove-btn').hide();
}

function showEditRemoveBtn() {
    $('#edit-btn').show();
    $('#remove-btn').show();
}

function showRegisterBtn(){
    $('#register-btn').show();
}

function hideRegisterBtn(){
    $('#register-btn').hide();
}

function submitForm(){
    var field = getFormData();
    ldsRollerStart();
    $.ajax({
        method: method,
        url: '/api/cat-field/',
        data: field,
    }).done(function(res) {
        ldsRollerStop();
        console.log(res);
        if (res.status) {
            location.reload();
        } else {
            showError(res.err);
        }
    }).fail(function(res){
        ldsRollerStop();
        showError(res.err);
    })
}

function setFormData(field){
    mainForm.id.value = field.FieldID || '';
    mainForm.cat.value = field.NOCat || '';
    mainForm.name.value = field.FieldName;
    mainForm.des.value = field.FieldDescription;
}

function getFormData(){
    var name = mainForm.name.value;
    var des = mainForm.des.value;
    var id = mainForm.id.value;
    return {FieldID: id, FieldName: name, FieldDescription: des}
}

function showError(err){
    Swal.fire({
        icon: 'error',
        title: 'Do this is error',
        text: err || 'Something went wrong!',
    });
}