
import { SetMetadata } from '@nestjs/common';

/*
export enum Role {
  User = 'user',
  Admin = 'admin',
  Manager = 'manager',
}

export const HAS_ROLES_KEY = 'hasRoles';
export const HasRoles = (...roles: Role[]) => SetMetadata(HAS_ROLES_KEY, roles);
*/
//------------------

export const HAS_SCOPE_KEY = 'hasScopes';
export const HasScopes = (...scopes:string[]) => SetMetadata(HAS_SCOPE_KEY, scopes);
