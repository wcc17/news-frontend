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
    }   
}