export interface Author {
    id: number;
    name: string;
    description: string;
    books: Book[];
}

export interface Book {
    id: number;
    title: string;
    genre: string;
    authorId: number;
    author: Author | null;
    imagePath:string;
}

export interface BookDto extends Book {
    authorName: string;
}