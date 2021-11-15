const pwdLib = require("../modules/password_schema.js")

const minPassword = '123'
const maxPassword = '0123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899'

test('validate password length: 5', () => {
  expect(pwdLib.validatePassword(minPassword)).toBe(false);
});

test('validate password length: 100', () => {
  expect(pwdLib.validatePassword(maxPassword)).toBe(false);
});

test('validate password uppercase requirement', () => {
  expect(pwdLib.validatePassword('12345')).toBe(false);
});

test('validate password lowercase requirement', () => {
  expect(pwdLib.validatePassword('12345A')).toBe(false);
});

test('validate password digits requirement', () => {
  expect(pwdLib.validatePassword('abcdEF')).toBe(false);
  expect(pwdLib.validatePassword('abcdEF1')).toBe(false);
});

test('validate password special character requirement', () => {
  expect(pwdLib.validatePassword('abcdEF12')).toBe(false);
});

test('validate password', () => {
  expect(pwdLib.validatePassword('abcdEF12@')).toBe(true);
  expect(pwdLib.validatePassword('abcdE342312@')).toBe(true);
});

