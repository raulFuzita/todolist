
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
    isEnableToken = $('#tokenToggle').is(':checked')
    putData('settings', { auth:{enable: isEnableToken} })
    .then(data => $('#tokenField').val(data.token))
})

