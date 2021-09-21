
const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const sinon = require('sinon');

const { neDBConfig } = require("../../lib/neDBConfig.js");
const {SelectDataDB, AddDataDB} = require("../../lib/neDBFunc.js");


// SelectDataDB

describe('neDB SelectDataDB OK', () => {
    let DB_F;
    beforeEach(async () => {
        // get the DB
        const db = await neDBConfig.createConection();
        // stub the items
        DB_F = sinon.stub(db.items, "find").returns({
            "id": 1,
            "nome": "nome",
            "valor": 10,
            "estoque": "estoque",
            "tamanho": "tamanho",
            "tipo": "tipo",
            "tipo_descricao": "descricao",
            "dataCadastro": "2021-09-20T22:56:52.976Z",
            "_id": "3BYTM0OLX3JBZe2T"
        })
    });
    afterEach(() => {
        DB_F.restore();
    });

    it('check SelectDataDB', async () => {    
        const response = await SelectDataDB("items", { id: '3BYTM0OLX3JBZe2T'});
        response._id.should.equal('3BYTM0OLX3JBZe2T');
    });
});

describe('neDB SelectDataDB retorna null', () => {
    let DB_F;
    beforeEach(async () => {
        // get the DB
        const db = await neDBConfig.createConection();
        // stub the items
        DB_F = sinon.stub(db.items, "find").returns(null)
      });
      afterEach(() => {
        DB_F.restore();
      });

    it('SelectDataDB retorna null', async () => {   
        const response = await SelectDataDB('items', {id: '3BYTM0OLX3JBZe2T'});
        console.log('response', response);
        expect(response).to.equal(null);

    });
});


describe('neDB SelectDataDB Error', () => {
    let DB_F;
    beforeEach(async () => {
        // get the DB
        const db = await neDBConfig.createConection();
        // stub the items
        DB_F = sinon.stub(db.items, "find").returns({
            message: "Error"
        });
      });
      afterEach(() => {
        DB_F.restore();
      });

    it('Error no SelectDataDB', async () => {   
        try { 
            await SelectDataDB('items', {id: '3BYTM0OLX3JBZe2T'});
        } catch(e) {
            e.message.should.equal("Error neDB");
            e.method.should.equal("SelectDataDB");
        }
    });
});


// insert

const data = {
    "id": 1,
    "nome": "nome",
    "valor": 10,
    "estoque": "estoque",
    "tamanho": "tamanho",
    "tipo": "tipo",
    "tipo_descricao": "descricao",
    "dataCadastro": "2021-09-20T22:56:52.976Z"
};


describe('neDB AddDataDB OK', () => {
    let DB_F;
    beforeEach(async () => {
        // get the DB
        const db = await neDBConfig.createConection();
        // stub the items
        DB_F = sinon.stub(db.items, "insert").returns({
            ops:[
                    {
                        _id: '3BYTM0OLX3JBZe2T',
                        ...data
                    }
                ]
        });
      });
      afterEach(() => {
        DB_F.restore();
      });

    it('check AddDataDB', async () => {    
        const {ops: [result]} = await AddDataDB('items', data);
        
        result._id.should.equal('3BYTM0OLX3JBZe2T');
    });
});


describe('neDB AddDataDB Error', () => {
    let DB_F;
    beforeEach(async () => {
        // get the DB
        const db = await neDBConfig.createConection();
        // stub the items
        DB_F = sinon.stub(db.items, "insert").returns({
            message: "Error"
        });
      });
      afterEach(() => {
        DB_F.restore();
      });

    it('Error no AddDataDB', async () => {   
        try { 
            await AddDataDB('items', data)
        } catch(e) {
            e.message.should.equal("Error neDB");
            e.method.should.equal("AddDataDB");
        }
 
    });
});