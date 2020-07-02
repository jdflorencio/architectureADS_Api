const service = require('./grupo.service')
const Response = require('../../core/response');
const BaseController = require('../../core/baseController');
class GrupoController extends BaseController{
	constructor() {
		super(service)
	}	
}

let grupo = new GrupoController();
module.exports = grupo;