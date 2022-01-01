const logging = {
    succes: (text) => {
        console.log(`%c ${text} `, 'background-color: green;border-radius:3px;border:darkgreen solid 1px')
    },
    info: (text) => {
        console.log(`%c ${text} `, 'background-color: orange;border-radius:3px;border:darkorange solid 1px;color:black')
    },
    warn: (text) => {
        console.log(`%c ${text} `, 'background-color: red;border-radius:3px;border:darkred solid 1px')
    }
}

export default logging