function isOkPass(p: string) {
    var anUpperCase = /[A-Z]/;
    var aLowerCase = /[a-z]/;
    var aNumber = /[0-9]/;
    var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    var obj = {
        result: true,
        error: ''
    };

    if (p.length < 6) {
        obj.result = false;
        obj.error = "Minimum of 6 Characters!"
        return obj;
    }

    var numUpper = 0;
    var numLower = 0;
    var numNums = 0;
    var numSpecials = 0;
    for (var i = 0; i < p.length; i++) {
        if (anUpperCase.test(p[i]))
            numUpper++;
        else if (aLowerCase.test(p[i]))
            numLower++;
        else if (aNumber.test(p[i]))
            numNums++;
        else if (aSpecial.test(p[i]))
            numSpecials++;
    }

    if (numUpper < 1) {
        obj.result = false;
        obj.error = "requires uppercase letter";
        return obj;
    } else if (numLower < 1) {
        obj.result = false;
        obj.error = "requires lowercase letter";
        return obj;
    } else if (numNums < 1) {
        obj.result = false;
        obj.error = "requires a number";
        return obj;
    }

    return obj;
}

function checkEmail(email: string) {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
        return true;
    }
    return false;
}


function extractNumberOnly(phoneNumber: any) {
    let results = phoneNumber.replace(/[- )(]/g, '');
    return results;
}

function validateForNumber(phoneNumber: any) {
    var isNum = /^\d+$/.test(phoneNumber);
    if (!isNum) {
        return false;
    }
    return true;
}
function capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export {
    isOkPass,
    checkEmail,
    validateForNumber,
    extractNumberOnly,
    capitalizeFirstLetter
}