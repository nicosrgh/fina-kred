const faker = require('faker')

function startAndEndHour(date) {
    var startHour = 8 + Math.random() * (11 - 8) | 0;
    var endHour = 17 + Math.random() * (20 - 17) | 0;

    const start = date.setHours(startHour)
    const end = date.setHours(endHour)

    return {
        start: new Date(start),
        end: new Date(end)
    }    
}

module.exports = startAndEndHour