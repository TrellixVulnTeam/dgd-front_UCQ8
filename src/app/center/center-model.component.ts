export class CenterModel {
    constructor (
        public id :number,
        public name :string,
        public site :string,
        public technical_manager_name :string,
        public area :number,
        public area_name :string,
        public discount :number,
        public satisfaction :number,
        public hours_of_work_id :number,
        public governmental_type :string,
        public latitude :number,
        public longitude :number,
        public logo :string,
        // public created_at :string,
        public updated_at :string,
        public _method :string,
        public is_editable :boolean,

        // public country_id : number,
        // public province_id : number,
        // public city_id : number,
        // public type_id : number,

        public center_type: CenterType,
        public country: Country,
        public province: Province,
        public city: City,
        public images: Image[],
    ) {

    }
}


export class CenterType {
    constructor(
        id : number,
        name: string,
        name_en: string,
    ) {

    }
}

export class Country {
    constructor(
        id : number,
        capital_city: number,
        name: string,
        name_en: string,
    ) {

    }
}

export class Province {
    constructor(
        id : number,
        countrry: number,
        name: string,
        name_en: string,
    ) {

    }
}

export class City {
    constructor(
        id : number,
        countrry: number,
        name: string,
        name_en: string,
    ) {

    }
}

export class Image {
    constructor(
        id : number,
        path: string,
    ) {

    }
}