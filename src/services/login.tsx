import { api } from "../api"

interface IResponse {
    status: boolean,
    data?: any
}

export const login = async (email: string, senha: string): Promise<IResponse> => {
    const data: any = await api

    if(email !== data.email || senha !== data.password) {
        return {status: false}
    }

    return {status: true, data: data}
}
