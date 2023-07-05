use sample_upc

// Crear una colección y validar con JSON Schema

// Validación tiene dos opciones
// validationLevel
// validationAction

// validationLevel: Determina a que documentos se le aplica las reglas de validación
// - strict: Valor por defecto. Las reglas de validación se aplican a las insercciones y actualizaciones.
// - moderate: Colocarlo de manera explícita. Las reglas se aplican solo a las insercciones
//             y a los documento que cumplen las reglas de validación.

// validationAction: Determina la acción a ejecutar cuando un documento no cumple con la regla de validación.
// - error: Valor por defecto. Rechazar la insercción o actualización del documento que no cumple con la regla de validación.
// - warn: Colocarlo de manera explícita. Si se permite la insercción o actualización del documento a pesar que
//         no cumpla con las reglas de validación. Se coloca una advertencia.

// Las validaciones se aplican a dos operaciones
// Insercción de un nuevo documento
// Actualización de un documento existente

// Crear una colección, utilizar JSON Schema validation
// validationLevel: Por defecto el valor es strict
// validationAction: Por defecto el valor es error

db.createCollection(
    "students",
    { validator:
        { $jsonSchema:
                {   bsonType: "object",
                    description: "Document describing a student",
                    required: ["name", "year", "courses", "address"],
                    properties:
                        {   "name":{
                            bsonType: "string",
                            description: "Name must be a string and is required"
                            },
                            "year": {
                                bsonType: "int",
                                minimum: 2000,
                                maximum: 2022,
                                description: "Year must be an int and is required"
                            },
                            "courses" : {
                                bsonType: "array",
                                description: "Course must be an array of strings",
                                minItems: 1,
                                uniqueItems: true,
                                items: {
                                    bsonType: "string"
                                }
                            },
                            "address" : {
                                bsonType: "object",
                                required: ["city"],
                                properties: {
                                    "city": {
                                        bsonType: "string",
                                        description: "City must be a string and is required"
                                    },
                                    "street":{
                                        bsonType: "string",
                                        description: "Street must be a string and is optional"
                                    }

                                }
                            },
                            "genre": {
                                enum: ["M", "F"],
                                description: "Genre can only be either 'M' or 'F' and is optional"
                           }
                         }
                }
        }
    }
);

// Caso erróneo de inserción de documento
db.students.insertOne(
    {
        name: "Jorge Mayta",
        year: NumberInt(2019),
        courses: ["SI400"]
    }
);

db.students.find();

// Caso válido de inserción de documento
db.students.insertOne(
    {
        name: "Raúl Perez",
        year: NumberInt(2020),
        courses: ["SI424"],
        address: {
            city: "Lima",
            street :"1116 Angamos Avenue"
        }
    }
);

db.students.find();

// Caso válido de inserción de documento
db.students.insertOne(
    {
        name: "Liz Ugarte",
        year: NumberInt(2020),
        courses: ["SI424"],
        address: {
            city: "Lima",
            street :"1116 Angamos Avenue"
        },
        genre:"F"
    }
);

// Caso válido de inserción de documento
db.students.insertOne(
    {
        name: "Carlos Machado",
        year: NumberInt(2020),
        courses: ["SI400", "SI424"],
        address: {
            city: "Cuzco"
        },
        genre:"F"
    }
)

db.students.find();

// Caso válido de insercción de documento
db.students.insertOne(
    {
        name: "Julio Martínez",
        year: NumberInt(2015),
        courses:["SI424"],
        address: {
            city: "Trujillo"
        },
        genre: "M"
    }
)

// Crear una colección, utilizar JSON Schema con la opción validationAction igual a warn
// validationLevel: Por defecto el valor es strict
// validationAction: Por defecto el valor es error
db.createCollection(
    "contacts",{
        validator: {
            $jsonSchema:{
                bsonType: "object",
                description: "Document describing a contact",
                required: ["email"],
                properties: {
                    telephone: {
                        bsonType: "string",
                        description: "Telephone must be a string and is optional"
                    },
                    email: {
                        bsonType: "string",
                        pattern: "@upc\.edu$",
                        description: "Email must be a string and is required"
                    }
                }
            }
        }
    }
);

db.runCommand( {
    collMod: "contacts",
    validator: {
            $jsonSchema:{
                bsonType: "object",
                description: "Document describing a contact",
                required: ["email"],
                properties: {
                    telephone: {
                        bsonType: "string",
                        description: "Telephone must be a string and is optional"
                    },
                    email: {
                        bsonType: "string",
                        pattern: "@upc\.edu$",
                        description: "Email must be a string and is required"
                    }
                }
            }
        },
    validationAction: "warn"
});

db.contacts.insertOne({telephone:"987654321"});

db.contacts.insertOne({email: "jmayta@upc.pe"});

db.contacts.insertOne({email: "jrios@upc.edu"});

db.contacts.find();


db.runCommand({
    collMod:"contacts",
    validator: {},
    validationLevel: "off"
});


db.createCollection("teachers",{
    validator: {
        $or: [
            {$jsonSchema:
                {
                    bsonType: "object",
                    description: "Document describing a teacher",
                    required: ["first_name"],
                    properties: {
                        first_name: {
                            type:"string",
                            description: "First name must a string and is required."
                        }
                    }
                },
            },
            {$jsonSchema:
                {
                    bsonType: "object",
                    description: "Document describing a teacher",
                    required: ["last_name"],
                    properties: {
                        last_name: {
                            type:"string",
                            description: "Last name must a string and is required."
                        }
                    }
                }
            }
        ]
    }
 });

 db.teachers.insertOne({first_name: "Jorge"});
