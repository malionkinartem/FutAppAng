import { IClub } from './iclub.model'

export interface ILeague {
    name: String,
    id: Number,
    ShortName: String,
    clubs: IClub[]
}
