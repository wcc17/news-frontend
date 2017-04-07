export class Post {
    title: string;
    description: string;
    imagePath: string;

    constructor(title: string, description: string, imagePath?: string) {
        this.title = title;
        this.description = description;
        this.imagePath = imagePath;
    }
}