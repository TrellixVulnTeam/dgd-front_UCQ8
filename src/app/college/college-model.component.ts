export class CollegeModel {
    constructor (
        public id :number,
        public name :string,
        public name_en :string,
        public created_at :string,
        public _method :string,
        public is_editable :boolean,
        // public updated_at :string,
    ) {

    }
}



export class DeleteCollegeModel {
    constructor (
        public id :number,
        public type :string
    ) {

    }
}