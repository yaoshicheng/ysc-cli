
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateUserInput {
    username?: string;
    password?: string;
    photos?: CreatePhotoInput[];
}

export interface CreatePhotoInput {
    name?: string;
    description?: string;
    filename?: string;
    views?: number;
    isPublished?: boolean;
    user?: CreateUserInput;
}

export interface UpdatePhotoInput {
    name?: string;
    description?: string;
    filename?: string;
    views?: number;
    isPublished?: boolean;
    user?: CreateUserInput;
}

export interface UpdateUserInput {
    id: number;
}

export interface Photo {
    name?: string;
    description?: string;
    filename?: string;
    views?: number;
    isPublished?: boolean;
    user?: User;
}

export interface User {
    username?: string;
    password?: string;
    photos?: Photo[];
}

export interface PhotoConnection {
    total?: number;
    edges?: PhotoEdge[];
    pageInfo?: PageInfo;
}

export interface PhotoEdge {
    cursor?: string;
    node?: Photo;
}

export interface PageInfo {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface IQuery {
    photosEdge(size?: number, number?: number): PhotoConnection | Promise<PhotoConnection>;
    photos(first?: number): Photo[] | Promise<Photo[]>;
    photo(id: number): Photo | Promise<Photo>;
    users(): User[] | Promise<User[]>;
    user(id: number): User | Promise<User>;
}

export interface IMutation {
    createPhoto(createPhotoInput: CreatePhotoInput): Photo | Promise<Photo>;
    updatePhoto(id: number, updatePhotoInput: UpdatePhotoInput): Photo | Promise<Photo>;
    removePhoto(id: number): Photo | Promise<Photo>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(id: number, updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): User | Promise<User>;
}
