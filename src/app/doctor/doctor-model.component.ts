export class DoctorModel {
    constructor (
        public id :number,
        public name :string,
        public site :string,
        public system_medicine_number :number,
        public work_experience :number,
        public country_id : number,
        public province_id : number,
        public city_id : number,
        public college_id : number,
        public area :number,
        public area_name :string,
        
        public satisfaction :number,
        
        
        public latitude :number,
        public longitude :number,
        
  
        public updated_at :string,
        public _method :string,
        public has_office :boolean,
        public is_editable :boolean,
        public phone_editable :boolean,
        public address_editable :boolean,
        public specialty_doctor_editable :boolean,
        
        
        public country: Country,
        public province: Province,
        public city: City,
        public college: College,
        public images: ImageModel[],
        public phones: PhoneModel[],
        public addresses: AddressModel[],
        public specialty_doctor: SpecialtyDoctorModel[],
    ) {

    }
}

export class College {
    constructor(
        public id : number,
        public name: string,
        public name_en: string,
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

export class SpecialtyDoctorModel {
    constructor(
      public  id : number,
      public name : string,
      public name_en : string,
      public _method :string,
      public pivot : Pivot,
    ) {

    }
}

export class Pivot {
    constructor(
      public  id : number,
      public  specialty_id : number,
      public  doctor_id : number,
    ) {

    }
}