export const validatePassword = (passwordRaw: string, passwordAgain: any) => {
    const password = passwordRaw.trim()
    return password.length > 7 && typeof passwordAgain === 'string' && password === passwordAgain.trim()
}
