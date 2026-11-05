import mongoose from "mongoose";

const programaSchema = new mongoose.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,      /* no se puede repetir el codigo */
        trim: true,
        uppercase: true    /* lo guarda en mayuscula, ej: TDS */
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 150
    },
    nivel: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["pregrado", "posgrado", "otros"]  /* solo deja estos 3 valores */
    },
    facultad: {
        type: mongoose.Schema.Types.ObjectId,    /* guarda el _id de la facultad */
        ref: "Facultad",                         /* y dice que viene del modelo Facultad */
        required: true
    }
},
   {
    timestamps: true,
    versionKey: false
   }
);

export default mongoose.model("Programa", programaSchema, "programas");
