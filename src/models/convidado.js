module.exports = (sequelize, DataTypes) =>{
    const Convidado = sequelize.define('Convidado',{
        name : {
            type : DataTypes.STRING,
            allowNull : false,
        },

        accessCode : {
            type : DataTypes.STRING,
            allowNull : false,
        },

        invitations:{
            type : DataTypes.INTEGER,
            allowNull : false,
        },

        jwtVersion:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

    })


    Convidado.associate = (models) =>{
        Convidado.hasMany(models.Confirmado, {foreignKey:'convidadoId'})
    }

    Convidado.prototype.toJson = function(){
        const values = { ...this.get() }
        delete values.accessCode;
        return values;
    }

    return Convidado;
}