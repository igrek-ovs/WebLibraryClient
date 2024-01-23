interface Author {
    id: number;
    name: string;
    description: string;
    books: Book[];
}

interface Book {
    id: number;
    title: string;
    genre: string;
    authorId: number;
    author: Author | null;
}

interface BookDto extends Book {
    authorName: string;
}

export {};