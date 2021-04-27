const toggleShowPassword = (iconId, inpuId) => {
    const isPasswordShown = $(iconId).hasClass('fa-eye-slash')
    if (isPasswordShown) {
        $(inpuId).prop('type', 'text')
        $(iconId).removeClass('fa-eye-slash').addClass('fa-eye')
    } else {
        $(inpuId).prop('type', 'password')
        $(iconId).removeClass('fa-eye').addClass('fa-eye-slash')
    }
}

const comparePassword = (confirmInput, passwordInput) => {
    $(confirmInput).keyup(() => {

        if ($(confirmInput).val() && $(passwordInput).val()) {
            if ($(confirmInput).val() == $(passwordInput).val()){
                $(confirmInput).css('color', 'green')
                $(passwordInput).css('color', 'green')
            } else {
                $(confirmInput).css('color', 'red')
                $(passwordInput).css('color', 'red')
            }
        } else {
            $(confirmInput).css('color', 'initial')
            $(passwordInput).css('color', 'initial')
        }
    })
}

$('.clear-input').click((e) => {
    $(e.target).parent().prev('input').val('')
})

