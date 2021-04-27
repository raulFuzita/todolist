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