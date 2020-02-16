const {Sequelize ,connection} = require('../connection')
const Model = Sequelize.Model
const Subgrupo = require('./subgrupo.model')

class Grupo extends Model{}
Grupo.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    descricao: Sequelize.STRING,
    log_criacao: {
        type: Sequelize.DATE
    },
	log_atualizacao: {
        type: Sequelize.DATE    
    },
	log_pct_usuario:{
        type: Sequelize.INTEGER
    }
},
{
    sequelize: connection,
    modelName: 'grupo',
    tableName: 'grupo',
    freezeTableName : true,
    timestamps : false,
    name:{
        singular:'grupo',
        plural: 'grupos'
    },
    underscored : false
});

Grupo.hasMany(Subgrupo, {
    foreignKey: 'grupoId',
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});

Subgrupo.hasOne(Grupo, {
    foreignKey: 'id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

module.exports = Grupo