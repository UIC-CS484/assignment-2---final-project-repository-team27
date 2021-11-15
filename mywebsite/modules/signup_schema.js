
const validateNewUser = (fname, lname, email, report_errors=false) => {
    if (report_errors) {
        errors = passwordSchema.validate(password, {list: true});
        errors.forEach(function(part, index, theArray) {
          theArray[index] = passwordSchemaErrors[theArray[index]];
        });
        return errors;
    }
    return passwordSchema.validate(password);
}

module.exports = {validateNewUser};

