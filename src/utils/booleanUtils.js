const usernameValidate = (username) => {
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9_-]{3,23}$/;
    if (username === null || username === undefined) {
        throw new Error("Tên đăng nhập không hợp lệ");
    }

    if (!USER_REGEX.test(username)) {
        throw new Error("Tên đăng nhập không hợp lệ");
    }

    return username;
}

const passwordValidate = (password) => {
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    if (password === null || password === undefined) {
        throw new Error("Mật khẩu không hợp lệ");
    }

    if (!PWD_REGEX.test(password)) {
        throw new Error("Mật khẩu không hợp lệ");
    }

    return password;
}

const uuidValidate = (uuid) => {
    const UUID_REGEX = /^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/;
    if (uuid === null || uuid === undefined) {
        throw {
            status: 400,
            message: 'UUID không hợp lệ'
        }
    }
    if (!UUID_REGEX.test(uuid)) {
        throw {
            status: 400,
            message: 'UUID không hợp lệ'
        }
    }
    return uuid;
}

const urlValidate = (url) => {
    const URL_REGEX = /^(http:\/\/www.|https:\/\/www.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+).[a-z]{2,5}(:[0-9]{1,5})?(\/.)?$/;
    if (url === null || url === undefined) {
        throw new Error("Url không hợp lệ");
    }
    if (!URL_REGEX.test(url)) {
        throw new Error("Url không hợp lệ");
    }
    return url;
}

const emailValidate = (email) => {
    const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email === null || email === undefined) {
        throw new Error("Email không hợp lệ");
    }
    if (!EMAIL_REGEX.test(email)) {
        throw new Error("Email không hợp lệ");
    }
    return email;
}

const phoneValidate = (phone) => {
    const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})/;
    if (phone === null || phone === undefined) {
        throw new Error("Số điện thoại không hợp lệ");
    }
    if (!PHONE_REGEX.test(phone)) {
        throw new Error("Số điện thoại không hợp lệ");
    }
    return phone;
}

const numberValidate = (number) => {
    const NUMBER_REGEX = /^\d+(\.\d+)?$/;
    if (number === null || number === undefined) {
        throw new Error("Số nguyên không hợp lệ");
    }
    if (!NUMBER_REGEX.test(number)) {
        throw new Error("Số nguyên không hợp lệ");
    }
    return Number(number);
}

const isUserStatusValid = (status) => {
    return (status === 'Active' || status === 'Blocked')
}

const fullnameValidate = (fullname) => {
    const FULLNAME_REGEX = /^[A-ZÀÁÂÃẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸĐ][a-zàáâãạảấầẩẫậắằẳẵặếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹđ]+$/;
    const names = fullname.trim().split(/\s+/); // Tách chuỗi thành mảng các từ, loại bỏ khoảng trắng thừa
    for (let i = 0; i < names.length; i++) {
        if (!FULLNAME_REGEX.test(names[i])) {
            throw new Error("Tên không hợp lệ");
        }
    }
    return fullname;
}

module.exports = { usernameValidate, passwordValidate, uuidValidate, urlValidate, emailValidate, phoneValidate, numberValidate, fullnameValidate, isUserStatusValid }
