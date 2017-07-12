import { IIdValueType } from './iid-value-type.model'

export interface IConfiguration {
        player?: IIdValueType,
        level?: String,
        minprice?: String,
        maxprice?: String,
        league?: IIdValueType,
        team?: IIdValueType,
        position?: String,
        isRare?: Boolean,
        zone?: String,
        buynowprice?: String,
        enabled?: Boolean,
        nation?: IIdValueType,
        _id?: String
}
