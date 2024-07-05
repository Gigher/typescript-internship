import { ReactNode } from "react";

export enum HTTPStatusCodes {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504
}

export type BaseType = {
    
}

export interface BaseInterface {
    statusCode: HTTPStatusCodes;
}

export interface postsSchema {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface BaseRickAndMortySchema {
    id: number;
    name: string;
    url: string;
    created: Date;
}

export interface CharacterSchema extends BaseRickAndMortySchema {
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: object;
    location: object;
    image: string;
    episode: Array<string>;
}

export interface LocationSchema extends BaseRickAndMortySchema {
    type: string;
    dimension: string;
    residents: Array<string>;
}

export interface EpisodeSchema extends BaseRickAndMortySchema {
    air_date: string;
    episode: string;
    characters: Array<string>;
}

export interface CollectionResponse<T> {
    data: { results: T[] };
    config: object;
    headers: { [key: string]: string };
    request: string;
    status: HTTPStatusCodes;
    statusText: string;
}

export interface CharacterCardProps {
    name: string;
    status: string;
    species: string;
    gender: string;
}

export type CharacterSummary = Omit<CharacterSchema, 'origin' | 'location'>;

export interface CardProps {
    children? : React.ReactNode;
    classname?: string;
    title: string;
}