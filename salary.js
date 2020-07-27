#!/usr/bin/env node
const connectionDB = require('./lib/db')
const moment = require('moment-business-days')

async function main() {
    const conn = await connectionDB()

    conn.connect((err) => {
        if(err) throw error
            const emp = `select * from employee 
                join titles on titles.emp_no = employee.emp_no
                join salaries on employee.emp_no = salaries.emp_no`
            conn.query(emp, (err, result, fields) => {
                result.map(rslt => {
                    const absence = `select * from employee_absence where emp_no ${rslt.emp_no}`
                    conn.query(absence, (err, result, fields) => {
                        const workingHour = result.reduce((next, prev) => {
                            return {
                                total: prev.total + (next.end_date - next.prev_date),
                                count: count + 1,
                                breakTime: prev.break_time + next.break_time
                            }
                        }, {total: 0, count: 0, breakTime: 0})

                    let salaryWorkingHour = 0
                    let decreaseSalaryBreakTime = 0
                    let titleSalary = 0


                    const averageWorkingHour = workingHour.total / workingHour.count
                    if (averageWorkingHour >= 12) {
                        salaryWorkingHour = result.salary * (5/100)
                    } else if (averageWorkingHour >= 8 && averageWorkingHour <= 12) {
                        salaryWorkingHour = result.salary * (2.5/100)
                    } else if (averageWorkingHour >= 5 && averageWorkingHour <= 8) {
                        salaryWorkingHour = result.salary * (0.5/100)
                    }
                    
                    const averageBreakTime = workingHour.breakTIme / workingHour.count
                    if (averageBreakTime > 60) {
                        decreaseSalaryBreakTime = result.salary * (1/100)
                    }

                    switch(result.title) {
                        case 'Staff':
                            titleSalary = result.salary * (1/100)
                            break
                        case 'Senior Engineer':
                            titleSalary = result.salary * (3/100)
                            break
                        case 'Engineer':
                            titleSalary = result.salary * (2/100)
                            break
                        case 'Assitant Engineer':
                            titleSalary = result.salary * (2.5/100)
                            break
                        case 'Assitant Engineer':
                            titleSalary = result.salary * (4/100)
                            break
                        default:
                            titleSalary = 1000
                            break
                    }

                    const increaseSalary = titleSalary + salaryWorkingHour - decreaseSalaryBreakTime 
                    let finalSalary

                    if (increaseSalary > 50000) {
                        finalSalary = result.salary + 50000
                    } else if (increaseSalary < 0) {
                        finalSalary = result.salary + 0
                    } else {
                        finalSalary = result.salary + increaseSalary
                    }

                    const updateSalary = `update salaries 
                        set salary = ${finalSalary} 
                        where emp_no = ${result.emp_no}`
                    
                    conn.query(updateSalary, (err, result, fields) => {
                        if (err) throw err
                        return result
                    })
                })
            })
        })
    })
}

main()