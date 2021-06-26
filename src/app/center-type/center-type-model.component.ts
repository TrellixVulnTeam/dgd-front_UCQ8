export class CenterTypeModel {
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



export class DeleteCenterTypeModel {
    constructor (
        public id :number,
        public type :string
    ) {

    }
}