const contacts = [
    {
        id: 1,
        user_id: 1,
        author_name: "Lore",
        user_name: "Lore",
        read: true,
        profile_pic: "/Personajes/1.png",
        last_connection: "Hoy 15:34",
        isConected: false,
        messages: [
            {
                id: 1,
                content: "Hola, ¿cómo estás?",
                author_id: 1,
                author_name: "Lore",
                created_at: "Hoy 15:20",
                status: "VIEWED",
                sender: "contact",
                read: true
            },
            {
                id: 2,
                content: "Bien, acá practicando para el TP de React ",
                author_id: 0,
                author_name: "Yo",
                created_at: "Hoy 15:22",
                status: "VIEWED",
                sender: "me",
                read: true
            },
            {
                id: 3,
                content: "Después pasame el link así lo veo",
                author_id: 1,
                author_name: "Lore",
                created_at: "Hoy 15:30",
                status: "VIEWED",
                sender: "contact",
                read: true
            }
        ]
    },
    {
        id: 2,
        user_id: 2,
        author_name: "Chino",
        user_name: "Chino",
        read: false,
        profile_pic: "/Personajes/2.png",
        last_connection: "Hoy 16:24",
        isConected: false,
        messages: [
            {
                id: 4,
                content: "Che, ¿ya armaste el Chat-UTN?",
                author_id: 2,
                author_name: "Chino",
                created_at: "Hoy 16:10",
                status: "NOT_VIEWED",
                sender: "contact",
                read: false
            },
            {
                id: 5,
                content: "Todavía no, estoy con los estilos del chat.",
                author_id: 0,
                author_name: "Yo",
                created_at: "Hoy 16:15",
                status: "NOT_VIEWED",
                sender: "me",
                read: false
            }
        ]
    },
    {
        id: 3,
        user_id: 3,
        author_name: "Jimena",
        user_name: "Jimena",
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
                sender: "contact",
                read: true
            },
            {
                id: 7,
                content: "Sí, ahora te lo mando por mail.",
                author_id: 0,
                author_name: "Yo",
                created_at: "Hoy 13:53",
                status: "VIEWED",
                sender: "me",
                read: true
            }
        ]
    },
    {
        id: 4,
        user_id: 4,
        author_name: "Pedro",
        user_name: "Pedro",
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
                sender: "contact",
                read: false
            }
        ]
    },
    {
        id: 5,
        user_id: 5,
        author_name: "Carlos",
        user_name: "Carlos",
        read: true,
        profile_pic: "/Personajes/5.png",
        last_connection: "Hoy 11:30",
        isConected: true,
        messages: [
            {
                id: 9,
                content: "Estoy probando el auto-reply del chat 😂",
                author_id: 5,
                author_name: "Carlos",
                created_at: "Hoy 11:15",
                status: "VIEWED",
                sender: "contact",
                read: true
            },
            {
                id: 10,
                content: "Jajaja, después pasame el repo.",
                author_id: 0,
                author_name: "Yo",
                created_at: "Hoy 11:18",
                status: "VIEWED",
                sender: "me",
                read: true
            }
        ]
    },
    {
        id: 6,
        user_id: 6,
        author_name: "Sofi",
        user_name: "Sofi",
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
                sender: "contact",
                read: false
            }
        ]
    },
    {
        id: 7,
        user_id: 7,
        author_name: "Marcos",
        user_name: "Marcos",
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
                sender: "contact",
                read: true
            },
            {
                id: 13,
                content: "Gracias",
                author_id: 0,
                author_name: "Yo",
                created_at: "Ayer 17:45",
                status: "VIEWED",
                sender: "me",
                read: true
            }
        ]
    },
    {
        id: 8,
        user_id: 8,
        author_name: "Carla",
        user_name: "Carla",
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
                sender: "contact",
                read: false
            }
        ]
    }
];

export default contacts;
