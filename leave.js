#!/usr/bin/env node
const connectionDB = require('./lib/db')

async function main() {
    const conn = await connectionDB()
    
    const types = ['Annual','Sick','Maternity','Unpaid']

    conn.connect((err) => {
        if(err) throw error
        const emp = 'select * from employee'
        conn.query(emp, (err, result, fields) => {
            if (err) throw error

            const currentDate = new Date()
            const dt = new Date()
            dt.setMonth(dt.getMonth() - 3)

            types.map(type => {
                const leaveDate = randomDate(dt, currentDate)
                const totalLeave = 1 + Math.random() * (10 - 1) | 0;
                
                let rslt
                if (type === 'Maternity') {
                    const a = result.filter(rs => rs.gender === 'F')
                    result = a[0]
                } else {
                    rslt = result[Math.floor(Math.random() * items.length)]
                }

                const start = leaveDate
                const until = leave.setDate(leaveDate.getDay() + totalLeave)

                const sql = `insert into employee_absence(emp_no, start_date, end_date, type) 
                values (${rslt.emp_no}, ${conn.escape(leaveDate)}, ${conn.escape(time.end)}, ${type})`
                conn.query(sql)
            })
        })
    })
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


main()