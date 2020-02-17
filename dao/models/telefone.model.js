const {Sequelize ,connection} = require('../connection')
const Model = Sequelize.Model

class PessoaTelefone extends Model {}
PessoaTelefone.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },    
  telefone : {
    type: Sequelize.STRING,
    allowNull: true,
  },
  tipo : {
    type: Sequelize.STRING,
    allowNull: true,
  }
}, {
  sequelize: connection,
  tableName: 'telefone',
  freezeTableName : true,
  timestamps : false,
  name:{
          singular:'telefone',
          plural: 'telefones'
  },
  underscored : false
  });

  ("TELFONES >>",PessoaTelefone === connection.models.PessoaTelefone)
module.exports = PessoaTelefone;    

