const IsNotNullOrEmpty = (value: any) => {
    if (value === undefined || value === null || value === '') {
        return true;
    }
    return false;
}

const IsEmail = (value: any) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(value);
}

export { IsNotNullOrEmpty, IsEmail };