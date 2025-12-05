const contacts = [
    {
        id: 3,
        user_id: 3,
        author_name: "Jimena",
        user_name: "Jimena",
        phone: "351 333-3333",
        read: true,
        profile_pic: "/Personajes/3.png",
        last_connection: "Hoy 14:02",
        isConected: true,
        messages: [
            {
                id: 6,
                content: "¿Tenés el pdf del módulo 3?",
                author_id: 3,
                author_name: "Jimena",
                created_at: "Hoy 13:50",
                status: "VIEWED",
                sender: "contact"
            },
            {
                id: 7,
                content: "Sí, ahora te lo mando por mail.",
                author_id: 0,
                author_name: "Yo",
                created_at: "Hoy 13:53",
                status: "VIEWED",
                sender: "me"
            }
        ]
    },
    {
        id: 5,
        user_id: 5,
        author_name: "Carlos",
        user_name: "Carlos",
        phone: "351 555-5555",
        read: true,
        profile_pic: "/Personajes/5.png",
        last_connection: "Hoy 11:30",
        isConected: true,
        messages: [
            {
                id: 9,
                content: "Estoy probando el auto-reply del chat",
                author_id: 5,
                author_name: "Carlos",
                created_at: "Hoy 11:15",
                status: "VIEWED",
                sender: "contact"
            },
            {
                id: 10,
                content: "Jajaja, después pasame el repo.",
                author_id: 0,
                author_name: "Yo",
                created_at: "Hoy 11:18",
                status: "VIEWED",
                sender: "me"
            }
        ]
    },
    {
        id: 6,
        user_id: 6,
        author_name: "Sofi",
        user_name: "Sofi",
        phone: "351 666-6666",
        read: false,
        profile_pic: "/Personajes/6.png",
        last_connection: "Hoy 09:41",
        isConected: true,
        messages: [
            {
                id: 11,
                content: "¿Me ayudás con Git que me tira error al hacer commit?",
                author_id: 6,
                author_name: "Sofi",
                created_at: "Hoy 09:30",
                status: "NOT_VIEWED",
                sender: "contact"
            }
        ]
    },
    {
        id: 8,
        user_id: 8,
        author_name: "Carla",
        user_name: "Carla",
        phone: "351 888-8888",
        read: false,
        profile_pic: "/Personajes/8.png",
        last_connection: "Hoy 08:00",
        isConected: true,
        messages: [
            {
                id: 14,
                content: "Acordate de mandarme mensaje",
                author_id: 8,
                author_name: "Carla",
                created_at: "Hoy 08:00",
                status: "NOT_VIEWED",
                sender: "contact"
            }
        ]
    },
    {
        id: 2,
        user_id: 2,
        author_name: "Chino",
        user_name: "Chino",
        phone: "351 222-2222",
        read: false,
        profile_pic: "/Personajes/2.png",
        last_connection: "Hoy 7:20",
        isConected: false,
        messages: [
            {
                id: 4,
                content: "Che, ¿ya armaste el Chat-UTN?",
                author_id: 2,
                author_name: "Chino",
                created_at: "Hoy 7:20",
                status: "NOT_VIEWED",
                sender: "contact"
            },
            {
                id: 5,
                content: "Todavía no, estoy con los estilos del chat.",
                author_id: 0,
                author_name: "Yo",
                created_at: "Hoy 7:25",
                status: "NOT_VIEWED",
                sender: "me"
            }
        ]
    },
    {
        id: 1,
        user_id: 1,
        author_name: "Lore",
        user_name: "Lore",
        phone: "351 111-1111",
        read: true,
        profile_pic: "/Personajes/1.png",
        last_connection: "Hoy 6:50",
        isConected: false,
        messages: [
            {
                id: 1,
                content: "Hola, ¿cómo estás?",
                author_id: 1,
                author_name: "Lore",
                created_at: "Hoy 6:25",
                status: "VIEWED",
                sender: "contact"
            },
            {
                id: 2,
                content: "Bien, acá practicando para el TP de React ",
                author_id: 0,
                author_name: "Yo",
                created_at: "Hoy 6:40",
                status: "VIEWED",
                sender: "me"
            },
            {
                id: 3,
                content: "Después pasame el link así lo veo",
                author_id: 1,
                author_name: "Lore",
                created_at: "Hoy 6:49",
                status: "VIEWED",
                sender: "contact"
            }
        ]
    },
    {
        id: 4,
        user_id: 4,
        author_name: "Pedro",
        user_name: "Pedro",
        phone: "351 444-4444",
        read: false,
        profile_pic: "/Personajes/4.png",
        last_connection: "Ayer 22:10",
        isConected: false,
        messages: [
            {
                id: 8,
                content: "¿Mañana hay clase presencial o virtual?",
                author_id: 4,
                author_name: "Pedro",
                created_at: "Ayer 21:55",
                status: "NOT_VIEWED",
                sender: "contact"
            }
        ]
    },
    {
        id: 7,
        user_id: 7,
        author_name: "Marcos",
        user_name: "Marcos",
        phone: "351 777-7777",
        read: true,
        profile_pic: "/Personajes/7.png",
        last_connection: "Ayer 18:05",
        isConected: false,
        messages: [
            {
                id: 12,
                content: "Te quedó muy bueno el logo del Chat-UTN.",
                author_id: 7,
                author_name: "Marcos",
                created_at: "Ayer 17:40",
                status: "VIEWED",
                sender: "contact"
            },
            {
                id: 13,
                content: "Gracias",
                author_id: 0,
                author_name: "Yo",
                created_at: "Ayer 17:45",
                status: "VIEWED",
                sender: "me"
            }
        ]
    }
];

export default contacts;
