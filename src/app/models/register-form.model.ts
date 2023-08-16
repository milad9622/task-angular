export interface RegisterInterface {
    name: string,
    email: string,
    password: string,
}

export interface RegisterFeedbackInterface {
    status: boolean,
    message?: string,
    data?: any,
}