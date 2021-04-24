
const checkTheme = (isDark) => {
    if (isDark) {
        document.documentElement.classList.add('dark-mode')
        document.querySelectorAll('.inverted-darkmode').forEach(result => {
            result.classList.add('invert')
        })
    } else {
        document.documentElement.classList.remove('dark-mode')
        document.querySelectorAll('.inverted-darkmode').forEach(result => {
            result.classList.remove('invert')
        })
    }
}

const isDarktheme = $('#darktheme').data('darktheme')
checkTheme(isDarktheme)

async function putData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
}

$('#darkthemeBtn').click(() => {
    const isEnableToken = $('#darkthemeBtn').is(':checked')
    const _csrf = $('#csrf').val()
    putData('profile', { darktheme:{enable: isEnableToken}, _csrf})
    .then(data => {
        console.log(data)
         if (typeof data === 'boolean') {
             console.log('Variable is ' + data)
             checkTheme(data)
         }
    })
})




