

export interface AuthCredentials {
    email: String,
    password: String
}


export type AuthState = {
    isLogin: boolean
    user: User | null,
    token: String | null,
    loading:boolean
}

export type User = {
    _id: String,
    name: String,
    lastName: String,
    email:String,
    avatar_url: String,
    avatar_min_url:String
}

export type ErrorRawResponse = {
    status: number,
    data: {
        predicate?: String,
        errors?: String[],
        message: String,
    }

}

export type AuthErrorResponse = {
    status: number,
    predicate?: String,

}
export type LoginResponse = {
    accessToken: String

}

export type RegisterResponse = {
    userId: String

}

export type CheckEmailResponse = {
    predicate: String,
    status: number | undefined
}

export type SetPasswordResponse = {
    message: String,
    predicate?: String,
    status: number | undefined
}