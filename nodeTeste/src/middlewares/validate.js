import {ValidaToken} from '../providers/tokens';

export const ValidaUsuario = () => async (ctx, next) => {
    const token = ctx.request.headers['authorization'];
    const validado = ValidaToken(token);

    if (validado === true) 
        await next();
    else
        ctx.throw(401, "Não autorizado");
}