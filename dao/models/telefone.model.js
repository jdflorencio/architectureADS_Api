const {Sequelize, DataTypes ,connection} = require('../connection')
const Model = Sequelize.Model

class PessoaTelefone extends Model {}
PessoaTelefone.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },    
  telefone : {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo : {
    type: DataTypes.STRING,
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

module.exports = PessoaTelefone;    

