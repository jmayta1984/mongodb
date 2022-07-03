/* Nombre, dirección, número de contacto*, cursos*/

use sample_upc;

db.createCollection(
    "teachers",
    { validator: {$jsonSchema:
        {   bsonType: "object",
            description: "Document describing a teacher",
            required: ["name", "address", "courses"],
            properties: {
                "name": {
                    bsonType: "string",
                    description: "Name must be a string and is required"
                },
                "address":{
                    bsonType: "object",
                    description: "Address must be an object and is required",
                    required:["city"],
                    properties: {
                        "city": {
                            bsonType: "string",
                            maxLength: 5,
                            description: "City must be a string and is required"
                        },
                        "street" :{
                            bsonType: "string",
                            description: "City must be a string and is optional"
                        }
                    }
                },
                "courses" :{
                    bsonType: "array",
                    minItems: 1,
                    uniqueItems: true,
                    items: {
                        bsonType: "string"
                    }
                }
            }

        }
        }

});

db.teachers.insertOne(
    {
        name: "David Montoya",
        address: {
            city: "Lima"
        } ,
        courses: ["SI400"]
    }
)

db.teachers.find();


db.teachers.insertOne(
    {
        name: "David Montoya",
        address: {
            city: "Chimbote"
        } ,
        courses: ["SI400"]
    }
)
