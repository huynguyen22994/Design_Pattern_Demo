interface Handler<Request = string, Result = string> {
    setNext(handler: Handler<Request, Result>): Handler<Request, Result>;
    setExec(callback: () => string): ProtectHandler;
    handle(request: Request): Result;
}

abstract class ProtectHandler implements Handler
{
    private nextHandler: Handler|undefined;
    private execFunction: (() => string)|undefined;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public setExec(callback: () => string): ProtectHandler {
        this.execFunction = callback;
        return this;
    }

    public handle(request: string): string {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return !!(this.execFunction) ? this.execFunction() : '';
    }
}


class UserHandler extends ProtectHandler {
    public handle(request: string): string {
        if (request === 'stop_user') {
            return `User ${request}: stop at User step.`;
        }
        return super.handle(request);

    }
}

class RoleHandler extends ProtectHandler {
    public handle(request: string): string {
        if (request === 'stop_role') {
            return `User ${request}: stop at Role step.`;
        }
        return super.handle(request);
    }
}

class PermissionHandler extends ProtectHandler {
    public handle(request: string): string {
        if (request === 'stop_permission') {
            return `User ${request}: stop at permission step.`;
        }
        return super.handle(request);
    }
}

const user_data = {
    id: 1,
    user: 'user 1'
}

const user = new UserHandler();
const role = new RoleHandler();
const permission = new PermissionHandler();

user.setNext(role)
    .setNext(permission)
    .setExec(() => {
    return JSON.stringify(user_data)
})

console.log('Chuỗi: User > Role > Permission\n');
console.log('Stop at permission: ' + user.handle('stop_permission'))
console.log('Stop at role: ' + user.handle('stop_role'))
console.log('Stop at user: ' + user.handle('stop_user'))
console.log('Pass Permission: ' + user.handle('pass'))
