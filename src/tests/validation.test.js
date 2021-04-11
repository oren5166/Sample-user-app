import React from 'react';
import {handleValidation} from '../genericFunctions/validation';

test('should check handleValidation function', () => {
  
  // Checking the function with empty value

  let mockFields = { password: undefined, userName: undefined };
  let errors = handleValidation(mockFields)
  expect(errors.password && errors.userName).toBe("Cannot be empty");

    // Checking the function with wrong value

  mockFields = { password: '2353', userName: 'aa@' };
  errors = handleValidation(mockFields)
  expect(errors.password).toBe("Must contain letters and numbers");
  expect(errors.userName).toBe("User Name is not valid");


});
