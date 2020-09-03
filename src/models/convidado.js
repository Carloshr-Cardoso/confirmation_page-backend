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
        
    })

    Convidado.prototype.toJson = function(){
        const values = { ...this.get() }
        delete values.accessCode;
        return values;
    }

    return Convidado;
}