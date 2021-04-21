
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

$('#sendForgotPwd').click(() => {
    const email = $('#emailrecovery').val()
    const _csrf = $('#csrf').val()
    postData('forgotpassword', {email, _csrf})
    .then(data => {
        if(showError(data))
            showPopupMessage('The email has been sent to you. Please, check your email inbox or spam.')
        console.log(data)
    })
    .catch((error) => {
        showPopupMessage('Failed to send an email. Please, contact the support')
    })
    $('#emailrecovery').val('')
})

const showPopupMessage = (message) => {
    $('#modalmessage').text(message)
}

const showError = ({emailError}) => {
    if (emailError){
        $('#popup').modal('hide')
        yieldAlert({emailError})
        return false
    }
    return true
}