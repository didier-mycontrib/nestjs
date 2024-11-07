export declare class NewsL0Dto {
    title: string;
    text: string;
    timestamp?: string;
    constructor(title?: string, text?: string, timestamp?: string);
}
export declare class NewsL1Dto extends NewsL0Dto {
    id: string;
    constructor(id?: string, title?: string, text?: string, timestamp?: string);
}
