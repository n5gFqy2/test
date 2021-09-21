const express = require("express");

const { customError } = require("../../lib/error.js");

const { SelectDataDB , AddDataDB , UpdateDB } = require("../../lib/neDBFunc.js");

// generador de UUID shortid
const uuid = require("shortid");

const router = express.Router();

//-----------------------------------
//-----------------------------------

router.post(
  "/venta",
  async (req, res, next) => {
    try {

       const data = req.body.data;
       const cpf = req.body.cpf;
       const item = req.body.item;

      const nf = {
        idNf: uuid.generate(),
        idItem: item._id,
        cpf,
        data
      };

      await AddDataDB("nf", nf);

      delete item.valor;
      delete item.estoque;
      delete item.dataCadastro;
      delete item._id;

      // Respuesta al Front
      res.locals.responseSend = { message: "ok" , data : { item, nf } };

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

router.post(
  "/devolucao",
  async (req, res, next) => {
    try {

       const idNF = req.body.idNF;
       const cpf = req.body.cpf;
       const IDitem = req.body.idItem;


       let item = {
        id : 1,
        nome : 'nome2',
        valor : 10,
        estoque : 1,
        tamanho : 'tamanho2',
        tipo : 'tipo',
        tipo_descricao : 'descricao',
        dataCadastro : new Date(),
        _id: IDitem
      };

      await AddDataDB("items",item);

      await UpdateDB("items", { _id: IDitem } ,  { "estoque" : 2 });

      const nf = {
          idNF,
          idItem: IDitem,
          cpf: "240",
          data: "2021-09-20T18:57:13.208Z"
      };

      await AddDataDB("nf", nf);

      await UpdateDB("nf", { idNF: idNF } ,  { "cancelamento" : true , "datacancelamento": new Date() });
  
      // Respuesta al Front
      res.locals.responseSend = { message: "ok" };

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


module.exports.routertx = router;
