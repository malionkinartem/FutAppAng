import { IAgent } from './iagent'

export interface IUser {
    username: String,
    firstname: String,
    lastname: String,
    password?: String,
    authToken?: String,
    agents?: IAgent[]
}

