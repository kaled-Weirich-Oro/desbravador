import Router from 'koa-router';
import Connection from '../config/database';
import {userToken} from '../providers/tokens';
import {ValidaUsuario} from '../middlewares/validate';

export const router = new Router();

router.get('/ping', ctx => {
    console.log('/ping');
    return ctx.body = {ping: "pong"}
});

router.get('/schema', ctx => {
    return Connection.schema.withSchema('public').createTable('users', function (table) {
        table.increments();
        table.string('teste')
       return ctx.body = "Criada a tabela users"
    });
})
router.get('/get', ValidaUsuario(), ctx  => {
    return Connection("teste").then((data) => {
       return ctx.body = {teste: data}
    });   
});
router.get('/get/:id', ctx => {
    let id = ctx.params.id;
    return Connection("teste").where("id", id).then((data) => {
        ctx.body = {teste: data[0]}
    });
});
router.post("/post", ctx => {
    let json = ctx.request.body;
    return Connection("teste").insert(json).then((data) => {
        ctx.body = {insert: "Inserido com sucesso"};
    }).catch((e) => {
        ctx.body = {erro: e};
    });
});
router.patch("/update/:id", ctx => {
    let id = ctx.params.id;
    let json = ctx.request.body;
    return Connection("teste").update(json).where("id", id).then((data) => {
        ctx.body = {teste: `teste ${json.id} atualizado`};
    }).catch((e) => {
        ctx.body = {erro: e};
    });
});
router.delete("/delete/:id", ctx => {
    let id = ctx.params.id;
    return Connection('teste').delete().where("id", id).then((data) => {
        ctx.body = {delete: "Deletado com sucesso"};
    }).catch((e) => {
        ctx.body = {erro: e};
    });
});
router.post('/login', async ctx => {
    const {login, senha} = ctx.request.body;
    return Connection('login').select('login', 'senha').where({'login': login, 'senha': senha}).then((data) => {
        let login = JSON.stringify(data[0].login);
        let id = JSON.stringify(data[0].id);
        const token = userToken(login, id);
        ctx.body = {token: token};
    }).catch((e) => {
        ctx.throw(500, e);
    })
});
router.post('/transaction', async ctx => {
    const json = ctx.request.body;
    return ctx.body = await transaction();
});
const transaction = async () => {
    const testes = [{id: 3, descricao: "teste 3"},
                    {id: 4, descricao: "teste 4"},
                    {id: 5, descricao: "teste 5"}];
    const pessoas = [{id: 1, nome: "Kaled Weirich Oro"},
                     {id: 2, nome: "Rafaeli Pinheiro"},
                     {id: 3, nome: "João Barnabé"}];
    return await Connection.transaction(async (t) => {
        return await Connection('teste').transacting(t).insert(testes).then(async () => {
            return await Connection('pessoa').transacting(t).insert(pessoas).then(() => {
                    t.commit;
                    return {Inserido: "Inserido com sucesso!"};
                }).catch((e) => {
                    t.rowback;
                    return {Inserido: `Erro ao inserir na tabela pessoa! ${e}`};
                });
        }).catch((e) => {
            t.rowback;
            return {Inserido: `Erro ao inserir na tabela teste! ${e}`};
        });
    });
}