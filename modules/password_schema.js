
// Validating the password

const minPasswordLength = 5;
const maxPasswordLength = 100;
const minUppercase = 1;
const minLowercase = 1;
const minDigits = 2;
const minSymbols = 1;

var passwordValidator = require('password-validator');

var passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
.is().min(minPasswordLength)                                    // Minimum length 8
.is().max(maxPasswordLength)                                  // Maximum length 100
.has().uppercase(minUppercase)                              // Must have uppercase letters
.has().lowercase(minLowercase)                              // Must have lowercase letters
.has().digits(minDigits)                                // Must have at least 2 digits
.has().symbols(minSymbols)
.has().not().spaces()                           // Should not have spaces

const passwordSchemaErrors = {
  'min': 'Minimum password length is ' + minPasswordLength + ' characters',
  'max': 'Maximum password length is ' + maxPasswordLength + ' characters',
  'uppercase': 'Password should include at least ' + minUppercase + ' uppercase letter',
  'lowercase': 'Password should include at least ' + minLowercase + ' lowercase letter',
  'digits': 'Password should include at least ' + minDigits + ' digit',
  'symbols': 'Password should include at least ' + minSymbols + ' symbol',
  'spaces': 'Password can not include spaces'
}

const validatePassword = (password, report_errors=false) => {
    if (report_errors) {
        errors = passwordSchema.validate(password, {list: true});
        errors.forEach(function(part, index, theArray) {
          theArray[index] = passwordSchemaErrors[theArray[index]];
        });
        return errors;
    }
    return passwordSchema.validate(password);
}

module.exports = {validatePassword};
