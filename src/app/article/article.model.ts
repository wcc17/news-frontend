export class Article {
    id: number;
    name: string; //I think I'll use this to store pictures for articles
    title: string;
    subTitle: string;
    publishDate: Date;
    content: string;

    constructor(obj?: any) {
        this.id             = (obj && obj.id)             || null;
        this.name           = (obj && obj.name)           || null;
        this.title          = (obj && obj.title)          || null;
        this.subTitle       = (obj && obj.subTitle)       || null;
        this.publishDate    = (obj && obj.publishDate)    || null;
        this.content        = (obj && obj.content)        || null; 

        this.publishDate = this.convertDateAPIToJS(this.publishDate);
    }  

    public convertDateAPIToJS(publishDate: any): Date {
        if(publishDate) {
            let year: number = publishDate.year;
            let month: number = publishDate.monthValue - 1; //javascript takes a 0 indexed month number
            let day: number = publishDate.dayOfMonth;

            //new Date(year, month, day, hours, minutes, seconds, milliseconds)
            return new Date(year, month, day, 0, 0, 0, 0);
        }

        return publishDate;
    } 

    public getArticleImagePath(): string {
        if(this.publishDate && this.name) {
            let year: string = this.publishDate.getFullYear().toString();
            let month: string = (this.publishDate.getMonth()+1).toString(); //javascript month is 0 indexed
            let day: string = this.publishDate.getDate().toString();
            
            //TODO: NOT ALL IMAGES WILL BE JPEGS! WHAT DO. can i check for local file existence?
            let path: string = 'assets/images/article/' + year + '/' + month + '-' + day + '/' + this.name + '.jpg';
            return path;
        }
    }
}