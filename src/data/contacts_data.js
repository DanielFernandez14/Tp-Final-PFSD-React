const contacts = [
    {
        id: 1,
        user_id: 1,
        author_name: "Pepe",
        user_name: "Pepe",
        read: true,
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
                status: "visto",
                sender: "contact",
                read: true
            }
        ]
    },
    {
        id: 2,
        user_id: 2,
        author_name: "Josh",
        user_name: "Josh",
        read: false,
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
                status: "Visto",
                sender: "contact",
                read: false
            }
        ]
    }
];

export default contacts;
