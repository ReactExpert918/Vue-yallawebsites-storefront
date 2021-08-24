export function mailValidate(val) {
    let re =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(val);
}

export function passValidate(pass, confirm) {
    if(pass.length < 6) {
        return false;
    }
    else {
        if(pass != confirm) {
            return false;
        }
        else {
            return true;
        }
    }
}