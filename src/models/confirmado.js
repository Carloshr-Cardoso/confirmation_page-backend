module.exports = (sequelize, DataTypes) =>{
    const Confirmado = sequelize.define('Confirmado',{
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },        
    })

    Confirmado.asociate = (models) =>{
        Confirmado.belongsTo(models.Convidado, {foreignKey: 'convidadoId'});
    };

    return Confirmado;
}