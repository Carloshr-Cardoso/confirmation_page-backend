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
        
        confirmado:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        jwtVersion:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        
        role:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        }
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