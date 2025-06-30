export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  createdAt: string;
}

export type TopicStatus = "Não iniciado" | "Em revisão" | "Estudado";

export interface Topic {
  id: string;
  title: string;
  status: TopicStatus;
  responsible?: User;
  comments: Comment[];
  priority: "Alta" | "Média" | "Baixa";
}

export interface StudyList {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Group {
  id: string;
  name: string;
  members: User[];
  studyLists: StudyList[];
}
