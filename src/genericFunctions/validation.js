export const handleValidation = fields => {

    let errors = {};

    //Password
    if (!fields["password"]) {
        errors["password"] = "Cannot be empty";
    }

    if (typeof fields["password"] !== "undefined" && !fields["password"].match(/^[a-zA-Z]+[0-9]+$/)) {
        errors["password"] = "Must contain letters and numbers";
    }

    //User Name
    if (!fields["userName"]) {
        errors["userName"] = "Cannot be empty";
    }

    if (typeof fields["userName"] !== "undefined") {
        const lastAtPos = fields["userName"].lastIndexOf('@');
        const lastDotPos = fields["userName"].lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["userName"].indexOf('@@') === -1 && lastDotPos > 2
            && (fields["userName"].length - lastDotPos) > 2)) {
            errors["userName"] = "User Name is not valid";
        }
    }

    return errors;
}
