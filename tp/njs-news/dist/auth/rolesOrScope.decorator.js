"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasScopes = exports.HAS_SCOPE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.HAS_SCOPE_KEY = 'hasScopes';
const HasScopes = (...scopes) => (0, common_1.SetMetadata)(exports.HAS_SCOPE_KEY, scopes);
exports.HasScopes = HasScopes;
//# sourceMappingURL=rolesOrScope.decorator.js.map