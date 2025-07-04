import { Group, User } from "../types";

export const users: User[] = [
  { id: "user-1", name: "Eloisa", avatar: "/static/images/avatar/1.jpg" },
  { id: "user-2", name: "Pablo", avatar: "/static/images/avatar/2.jpg" },
  { id: "user-3", name: "Caio Vitor", avatar: "/static/images/avatar/3.jpg" },
  { id: "user-4", name: "Gabriela", avatar: "/static/images/avatar/4.jpg" },
  {
    id: "user-5",
    name: "Caio Magalhães",
    avatar: "/static/images/avatar/5.jpg",
  },
  { id: "user-6", name: "Abimael", avatar: "/static/images/avatar/6.jpg" },
];

export const loggedInUser = users[3]; // Gabriela is now the logged in user

export const mockGroups: Group[] = [
  {
    id: "group-1",
    name: "Grupo de Estudo de React",
    code: "REACT101",
    creator: users[0], // Eloisa
    members: users, // All users
    studyLists: [
      {
        id: "list-1",
        name: "Hooks e Conceitos Avançados",
        topics: [
          {
            id: "topic-1",
            title: "useState e useEffect",
            status: "Estudado",
            responsible: users[0], // Eloisa
            priority: "Alta",
            comments: [
              {
                id: "comment-1",
                author: users[1], // Pablo
                text: "Podemos revisar o useEffect?",
                createdAt: "2023-10-27T10:00:00Z",
              },
            ],
          },
          {
            id: "topic-2",
            title: "useContext e Redux",
            status: "Em revisão",
            responsible: users[1], // Pablo
            priority: "Alta",
            comments: [],
          },
          {
            id: "topic-3",
            title: "Renderização Condicional",
            status: "Não iniciado",
            priority: "Média",
            comments: [],
          },
        ],
      },
    ],
    events: [
      {
        id: "event-1",
        name: "Sessão de Dúvidas - Hooks",
        dateTime: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
        location: "Biblioteca Central, Sala 5",
        creator: users[0], // Eloisa
      },
      {
        id: "event-2",
        name: "Revisão Pré-Prova (Passado)",
        dateTime: new Date("2023-05-20T14:00:00"), // Past event
        location: "Online - Google Meet",
        creator: users[1], // Pablo
      },
    ],
  },
  {
    id: "group-2",
    name: "Grupo de Estudo de Design Patterns",
    code: "DESIGNP202",
    creator: users[2], // Caio Vitor
    members: [users[0], users[2]], // Eloisa, Caio Vitor
    studyLists: [
      {
        id: "list-2",
        name: "Padrões Criacionais",
        topics: [
          {
            id: "topic-4",
            title: "Singleton",
            status: "Estudado",
            responsible: users[0], // Eloisa
            priority: "Alta",
            comments: [],
          },
          {
            id: "topic-5",
            title: "Factory Method",
            status: "Não iniciado",
            responsible: users[2], // Caio Vitor
            priority: "Média",
            comments: [],
          },
        ],
      },
    ],
    events: [],
  },
  {
    id: "group-3",
    name: "Tópicos Avançados de Engenharia de Software e Arquitetura de Microsserviços",
    code: "ARCH303",
    creator: users[3], // Gabriela
    members: [users[1], users[2], users[3]], // Pablo, Caio Vitor, Gabriela
    studyLists: [],
    events: [],
  },
  {
    id: "group-4",
    name: "UX/UI Design",
    code: "UXUI404",
    creator: users[0], // Eloisa
    members: [users[0], users[3]], // Eloisa, Gabriela
    studyLists: [],
    events: [],
  },
  {
    id: "group-5",
    name: "Preparatório para Certificação AWS",
    code: "AWS505",
    creator: users[1], // Pablo
    members: users, // All users
    studyLists: [],
    events: [],
  },
  {
    id: "group-6",
    name: "Estruturas de Dados",
    code: "DATA606",
    creator: users[3], // Gabriela
    members: [users[1], users[3]], // Pablo, Gabriela
    studyLists: [],
    events: [],
  },
];
