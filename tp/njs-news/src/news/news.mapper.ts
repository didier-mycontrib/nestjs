import { NewsDto } from "./news.dto";
import { News } from "./news.itf";

export function toNewsDto(n: News): NewsDto{
    return new NewsDto(n.id , n.title , n.text , n.timestamp); 
}

export function toNewsDtoArray(nArray: News[]): NewsDto[]{
    let nDtos=[];
    for(let n of nArray)
        nDtos.push(new NewsDto(n.id , n.title , n.text , n.timestamp)); 
    return nDtos;
}

export function fromNewsDto(n: NewsDto): News{
    return { id: n.id ,
            title: n.title , 
            text: n.text , 
            timestamp:  n.timestamp}; 
}