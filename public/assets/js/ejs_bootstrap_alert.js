/**
 * Error format
 * 
 * {
 *      errors: {
 *          errorName: {status: 'alert-status', message: 'error message'}
 *      }
 * }
 * 
*/
const yieldAlert = (error) => {

    if (!!error) {
        for (let prop in error)
            $('#alert-wrapper').prepend(appendAlert(error[prop].status, error[prop].message))
        $('.alert').each((i, o) => $(o).addClass('alert-animation'))

        const time = Object.keys(error).length * 1810
        setTimeout(() => {$('*').remove('.alert')}, time)
    }
}

const appendAlert = (status, message) => {
    return `<div role="alert" class="alert ${status}">${message}</div>`
}