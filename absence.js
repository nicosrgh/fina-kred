#!/usr/bin/env node
const startAndEndHour = require('./lib/date')
const connectionDB = require('./lib/db')
const moment = require('moment-business-days')

async function main() {
    moment.updateLocale('id', {
        workingWeekdays: [1, 2, 3, 4, 5]
     });
    const conn = await connectionDB()

    conn.connect((err) => {
        if(err) throw error
        
        const emp = 'select * from employee'
        conn.query(emp, (err, result, fields) => {
            if (err) throw error
            const currentDate = new Date()
            const dt = new Date()
            dt.setMonth(dt.getMonth() - 3)
        
            while (dt <= currentDate) {
                result.map(rslt => {
                    const time = startAndEndHour(dt)
                    const breakTime = 30 + Math.random() * (90 - 30) | 0;
        
                    const sql = `insert into employee_absence(emp_no, start_date, end_date, break_time) 
                    values (${rslt.emp_no}, ${conn.escape(time.start)}, ${conn.escape(time.end)}, ${breakTime})`
                    conn.query(sql)
                })
                dt.setDate(dt.getDay() + 1)
            }
        })
    })
}

main()