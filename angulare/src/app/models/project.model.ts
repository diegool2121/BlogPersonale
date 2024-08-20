export class Project {
    constructor(
        public _id: number,
        public name: String,
        public description: String,
        public category: String,
        public year: number,
        public langs: String,
        public image: String
    ) { }
}