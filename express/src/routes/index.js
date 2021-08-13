import { Router } from 'express';
import { name, version, author } from '../../package';
import teste from '../models/teste';
import db from '../config/database';

const router = Router()

router.get('/', (_req, res) => res.json({ name, version, author }))

router.get('/ping', (_req, res) => res.send('pong'))

router.get('/healthz', (_req, res) => res.send('OK'))

router.get('/teste', async (req, res) => {
    await db.sync();
    res.send({teste: await teste.findAll()});
});

router.post('/teste', async (req, res) => {
    const obj = req.body;
    await db.sync();
    const novo = await teste.create(obj);
    res.send({Insert: novo});
});

router.get('/teste/:id', async (req, res) => {
    let id = req.params.id;
    await db.sync();
    res.send({teste: await teste.findByPk(id)});
});

router.patch('/teste/:id', async (req, res) => {
    const obj = req.body;
    const id = req.params.id;
    await db.sync();
    let testeid = await teste.findByPk(id);
    testeid.id  = obj.id;
    testeid.descricao = obj.descricao;
    testeid.save();
    res.send("Atualizado");
});

router.delete('/teste/:id', async (req, res ) => {
    const id = req.params.id;
    await db.sync();
    await teste.destroy({ where : {
        id: id
    }});
    res.send(`teste ${id} deletado!`);
});


module.exports = router;