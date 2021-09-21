const express = require("express");
const { Console } = require("winston/lib/winston/transports");

const { customError } = require("../../lib/error.js");

const { SelectDataDB , AddDataDB , UpdateDB } = require("../../lib/neDBFunc.js");

const router = express.Router();

//-----------------------------------
//-----------------------------------

router.post(
  "/DBCheck",
  async (req, res, next) => {
    try {

      let item1 = {
        id : 1,
        nome : 'nome',
        valor : 10,
        estoque : 'estoque',
        tamanho : 'tamanho',
        tipo : 'tipo',
        tipo_descricao : 'descricao',
        dataCadastro : new Date()
      };

      let item2 = {
        id : 1,
        nome : 'nome',
        valor : 10,
        estoque : 'estoque',
        tamanho : 'tamanho',
        tipo : 'tipo',
        tipo_descricao : 'descricao',
        dataCadastro : new Date()
      };

      let item3 = {
        id : 1,
        nome : 'nome2',
        valor : 10,
        estoque : 'estoque',
        tamanho : 'tamanho2',
        tipo : 'tipo',
        tipo_descricao : 'descricao',
        dataCadastro : new Date()
      };

      const items = await AddDataDB("items",[item1, item2, item3]);

      let itCheck = items.filter((item, index, self) =>
                      index === self.findIndex((i) => (
                        i.nome === item.nome && 
                        i.valor === item.valor &&
                        i.tipo === item.tipo &&
                        i.tamanho === item.tamanho
                      ))
                    );

      const itemsCH = await AddDataDB("itemsCheck", itCheck);

      // Respuesta al Front
      res.locals.responseSend = { message: "ok" , data : itemsCH };

      res.locals.responseCode = 200;

      // call the responseÂ´s log middleware
      next();
    } catch (e) {
      //console.log('Error occurred');
      // call the Error middleware
      next(e);
    }
  }
);


module.exports.routerDBCheck = router;
