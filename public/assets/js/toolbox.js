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

const textColor = (inputs, color) => {
    inputs.forEach(e => $(e).css('color', color))
}

const checkchanges = (inputTarget, inputCompare) => {
    let inputs = [inputTarget, inputCompare]
    if ($(inputTarget).val() && $(inputCompare).val()) {
        let color = $(inputTarget).val() == $(inputCompare).val() ? 'green' : 'red'
        textColor(inputs, color)
    } else {
        textColor(inputs, 'initial')
    }
}

const comparePassword = (confirmInput, passwordInput) => {
    $(passwordInput).keyup(() => {
        checkchanges(passwordInput, confirmInput)
    })
    $(confirmInput).keyup(() => {
        checkchanges(confirmInput, passwordInput)
    })
}

$('.clear-input').click((e) => {
    $(e.target).parent().prev('input').val('')
})

