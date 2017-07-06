import { IClub } from './club.model'

export interface ILeague{
    name: String,
    id: Number,
    ShortName: String,
    clubs: IClub[]
}