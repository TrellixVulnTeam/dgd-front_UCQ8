export class HoursOfWorkModel {
    constructor (
        public id :number,
        public saturday_start :string,
        public saturday_end :string,
        public sunday_start :string,
        public sunday_end :string,
        public monday_start :string,
        public monday_end :string,
        public thursday_start :string,
        public thursday_end :string,
        public wednesday_start :string,
        public wednesday_end :string,
        public tuesday_start :string,
        public tuesday_end :string,
        public friday_start :string,
        public friday_end :string,
        public created_at :string,
        public _method :string,
        public is_editable :boolean,
        // public updated_at :string,
    ) {

    }
}



export class DeleteHoursOfWorkModel {
    constructor (
        public id :number,
        public type :string
    ) {

    }
}