function ldsRollerStop(){
    $('.lds-roller div').css('animation', 'none');
    $('.lds-roller').hide();
}

function ldsRollerStart(){
    $('.lds-roller div').css('animation', 'lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite');
    $('.lds-roller').show();
}