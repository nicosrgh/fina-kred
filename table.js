const connectionDB = require('./lib/db')

async function main() {
    const conn = await connectionDB()
    const absenceTable = `CREATE TABLE employee_absence 
    (
        id int NOT NULL AUTO_INCREMENT,
        emp_no int, 
        start_date datetime,
        end_date datetime,
        break_time int,
        PRIMARY KEY (id)
    )`;

    conn.query(absenceTable)

    const employee_leave = `CREATE TABLE employee_leave 
    (
        id int NOT NULL AUTO_INCREMENT,
        emp_no int, 
        start_date datetime,
        end_date datetime,
        type varchar(255),
        PRIMARY KEY (id)
    )`;

    conn.query(employee_leave)
}

main()