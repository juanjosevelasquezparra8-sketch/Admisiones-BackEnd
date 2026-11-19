import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,      /* no se pueden repetir correos */
        trim: true,
        lowercase: true,
        maxlength: 120
    },
    password: {
        type: String,
        required: true,
        select: false      /* la contraseña NO sale cuando se consulta el usuario */
    },
    activo: {
        type: Boolean,
        default: true      /* si se pone en false, ese usuario ya no puede entrar */
    }
},
   {
    timestamps: true,
    versionKey: false
   }
);

export default mongoose.model("Usuario", usuarioSchema, "usuarios");
