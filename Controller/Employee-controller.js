const EmployeeSchema = require("../Model/Employee-model")

const add_employee = (req, res) => {
    console.log(req.body);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    console.log(result);


    const employee = new EmployeeSchema({
        employee_id: result,
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        place: req.body.place,
    })

    employee.save()
        .then(data => {
            res.send({
                message: "Success",
                data: data
            })
        })
        .catch(err => {
            console.log(err.message)
        })

}


const get_employees = async (req, res) => {

    try {
        const employeeList = await EmployeeSchema.find({}, {});
        res.send(employeeList);
    } catch (error) {
        console.log(error.message);
    }
}


const edit_employee = async (req, res) => {
    const newPlace = "Egmore";
    try {
        const employeeList = await EmployeeSchema.findOneAndUpdate(
            { employee_id: req.params.employee_id },
            { place: newPlace },
            { new: true } // To return the updated document
        );
        console.log(employeeList);
        if (!employeeList) {
            return res.status(404).send({ error: "Employee not found" });
        }

        res.send(employeeList);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Server error" });
    }
}

const delete_employee = async (req, res) => {
    try {
        const employeeList = await EmployeeSchema.findOneAndDelete({ employee_id: req.params.employee_id });
        console.log(employeeList);
        res.send("Deleted");
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: "Server error" });
    }
}





module.exports = { add_employee, get_employees, edit_employee,delete_employee }