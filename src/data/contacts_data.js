
//  Estructura de un contacto con su mensajeria-> 

/*
  {
    id,
    user_id, -> id del usuario con el que estamos hablando
    profile_pic, -> img de perfil del usuario
    last_connection, "15:34"-> ultima conexion del usuario
    status, -> isConected: true/false,


    messages: -> [
    {

      id,
      content -> "Hola, como estas?"-> contenido del mensaje
      author_id -> id del autor del mensaje
      created_at -> timestamp de creacion
      status "visto/no visto" -> estado del mensaje

    }
    ]
*/


const contacts = [
    {
        id: 1,
        user_id: 1,
        author_name: "Pepe",
        user_name: "Pepe",
        profile_pic: "https://img.freepik.com/vector-gratis/icono-personaje-tecnologia-robot-ai_24877-83742.jpg?semt=ais_hybrid&w=740&q=80",
        last_connection: "Hoy 15:34",
        isConected: false,
        messages: [
            {
                id: 1,
                content: "Hola, como estas?",
                author_id: 1,
                author_name: "Pepe",
                created_at: "Hoy",
                status: "visto"
            }
        ]
    }
    ,
    {
        id: 2,
        user_id: 2,
        author_name: "Josh",
        user_name: "Josh",
        profile_pic: "https://img.freepik.com/vector-gratis/icono-personaje-tecnologia-robot-ai_24877-83742.jpg?semt=ais_hybrid&w=740&q=80",
        last_connection: "Hoy 16:24",
        isConected: false,
        messages: [
            {
                id: 2,
                content: "Hola, como estas?",
                author_id: 2,
                author_name: "Josh",
                created_at: "Hoy",
                status: "Visto"
            }
        ]
    }
];


export default contacts;