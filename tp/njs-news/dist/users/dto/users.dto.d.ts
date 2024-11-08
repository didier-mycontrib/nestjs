export declare class UserL0Dto {
    username: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    newPassword?: string;
    mainGroup?: string;
    constructor(username?: string, firstName?: string, lastName?: string, email?: string, newPassword?: string, mainGroup?: string);
}
export declare class UserL1Dto extends UserL0Dto {
    id: string;
    constructor(id?: string, username?: string, firstName?: string, lastName?: string, email?: string, newPassword?: string, mainGroup?: string);
}
