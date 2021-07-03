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
        public hours_of_work_id :number | null,
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
        public insurance_company_center_editable :boolean,
        public special_doctor_editable :boolean,

        public country_id : number | null,
        public province_id : number | null,
        public city_id : number | null,
        public type_id : number | null,

        public center_type: CenterType,
        public country: Country,
        public province: Province,
        public city: City,
        public images: ImageModel[],
        public phones: PhoneModel[],
        public addresses: AddressModel[],
        public special_tests_center: SpecialTestCenterModel[],
        public insurance_companies_center: InsuranceCompanyCenterModel[],
        public special_doctors: SpecialDoctorModel[],
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
       public  id : number,
       public   countrry: number,
       public  name: string,
       public  name_en: string,
    ) {

    }
}

export class City {
    constructor(
        public   id : number,
        public   province: number,
        public name: string,
        public name_en: string,
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
      public pivot : Pivot,
    ) {

    }
}


export class InsuranceCompanyCenterModel {
    constructor(
      public  id : number,
      public name : string,
      public name_en : string,
      public _method :string,
      public pivot : Pivot,
      public type : string,
    ) {

    }
}


export class SpecialDoctorModel {
    constructor(
      public  id : number,
      public name : string,
      public center_id : number,
      public _method :string,
    ) {

    }
}


export class Pivot {
    constructor(
      public  id : number,
      public  special_test_id : number | null,
      public  insurance_company_id : number | null,
      public  center_id : number,
    ) {

    }
}
