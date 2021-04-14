
$('#uploadImage').on('change', () => {
    if ($('#uploadImage').prop('files')[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
            $('#imageProfile').attr('src', e.target.result)
        }
        reader.readAsDataURL($('#uploadImage').prop('files')[0])
    }
})


$('#removeBtn').click((e) => {
    _csrf = $('#csrfProfile').val()
    $('#profileForm').attr('action', `profile/delete?_csrf=${_csrf}`)
})
