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
        public phone_editable :boolean,
        public address_editable :boolean,
        public special_test_center_editable :boolean,

        // public country_id : number,
        // public province_id : number,
        // public city_id : number,
        // public type_id : number,

        public center_type: CenterType,
        public country: Country,
        public province: Province,
        public city: City,
        public images: ImageModel[],
        public phones: PhoneModel[],
        public addresses: AddressModel[],
        public special_tests_center: SpecialTestCenterModel[],
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

export class ImageModel {
    constructor(
      public  id : number,
      public  path: string,
      public image : any,
      public type : string,
      public _method :string,
    ) {

    }
}



export class PhoneModel {
    constructor(
      public  id : number,
      public phone : string,
      public type : string,
      public _method :string,
    ) {

    }
}



export class AddressModel {
    constructor(
      public  id : number,
      public address : string,
      public neighbourhood : string,
      public type : string,
      public _method :string,
    ) {

    }
}


export class SpecialTestCenterModel {
    constructor(
      public  id : number,
      public name : string,
      public name_en : string,
      public _method :string,
    ) {

    }
}