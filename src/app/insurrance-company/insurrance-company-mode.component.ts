export class InsurranceCompanyModel {
    constructor (
        public id :number,
        public name :string,
        public name_en :string,
        public created_at :string,
        public _method :string,
        public is_editable :boolean,
        public type :string,
        public insurance_type :string,
    ) {

    }
}



export class DeleteInsurranceCompanyModel {
    constructor (
        public id :number,
    ) {

    }
}