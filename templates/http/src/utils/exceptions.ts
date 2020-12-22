import { HttpException } from '@evojs/http';

export class UnauthorizedException extends HttpException {
	constructor(message?: string, details?: any) {
		super(401, message ?? 'Unauthorized', details);
		Object.setPrototypeOf(this, UnauthorizedException.prototype);
	}
}

export class ForbiddenException extends HttpException {
	constructor(message?: string, details?: any) {
		super(403, message ?? 'Forbidden', details);
		Object.setPrototypeOf(this, ForbiddenException.prototype);
	}
}

export class NotFoundException extends HttpException {
	constructor(message?: string, details?: any) {
		super(404, message ?? 'Not Found', details);
		Object.setPrototypeOf(this, NotFoundException.prototype);
	}
}

export class BadRequestException extends HttpException {
	constructor(message?: string, details?: any) {
		super(400, message ?? 'Bad Request', details);
		Object.setPrototypeOf(this, BadRequestException.prototype);
	}
}

export class PreconditionFailedException extends HttpException {
	constructor(message?: string, details?: any) {
		super(400, message ?? 'Precondition Failed', details);
		Object.setPrototypeOf(this, PreconditionFailedException.prototype);
	}
}

export class InternalServerErrorException extends HttpException {
	constructor(message?: string, details?: any) {
		super(500, message ?? 'Internal Server Error', details);
		Object.setPrototypeOf(this, InternalServerErrorException.prototype);
	}
}

export class NotImplementedException extends HttpException {
	constructor(message?: string, details?: any) {
		super(501, message ?? 'Not Implemented', details);
		Object.setPrototypeOf(this, NotImplementedException.prototype);
	}
}
