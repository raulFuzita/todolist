
async function putData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
}

$('#copyToken').click(() => {
    $('#tokenField').select()
    document.execCommand('copy')
})

$('#tokenToggle').click(() => {
    const isEnableToken = $('#tokenToggle').is(':checked')
    const _csrf = $('#csrf').val()
    putData('settings', { auth:{enable: isEnableToken}, _csrf})
    .then(data => {
        $('#tokenField').val(data.token)
        const alert = isEnableToken 
        ? {auth: {status: 'alert-warning', message: 'API token is enabled'}} 
        : {auth: {status: 'alert-success', message: 'API token is disabled'}}
        yieldAlert(alert)
    })
})