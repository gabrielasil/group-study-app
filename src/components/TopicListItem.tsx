import React from "react";
import {
  ListItem,
  ListItemText,
  Select,
  MenuItem,
  Avatar,
  Chip,
  Box,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { Topic, User, TopicStatus } from "../types";

interface TopicListItemProps {
  topic: Topic;
  users: User[];
  onUpdateTopic: (updatedTopic: Topic) => void;
}

const statusColors: { [key in TopicStatus]: "error" | "warning" | "success" } =
  {
    "Não iniciado": "error",
    "Em revisão": "warning",
    Estudado: "success",
  };

const TopicListItem: React.FC<TopicListItemProps> = ({
  topic,
  users,
  onUpdateTopic,
}) => {
  const handleStatusChange = (event: SelectChangeEvent) => {
    onUpdateTopic({ ...topic, status: event.target.value as TopicStatus });
  };

  const handleResponsibleChange = (event: SelectChangeEvent) => {
    const responsible = users.find((u) => u.id === event.target.value);
    onUpdateTopic({ ...topic, responsible });
  };

  return (
    <ListItem divider>
      <ListItemText
        primary={topic.title}
        secondary={`Prioridade: ${topic.priority}`}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Select
          value={topic.status}
          onChange={handleStatusChange}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="Não iniciado">Não iniciado</MenuItem>
          <MenuItem value="Em revisão">Em revisão</MenuItem>
          <MenuItem value="Estudado">Estudado</MenuItem>
        </Select>
        <Chip label={topic.status} color={statusColors[topic.status]} />

        <Select
          value={topic.responsible?.id || ""}
          onChange={handleResponsibleChange}
          displayEmpty
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="" disabled>
            <em>Não atribuído</em>
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={user.avatar}
                  sx={{ width: 24, height: 24, mr: 1 }}
                />
                <Typography>{user.name}</Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
        {topic.responsible && (
          <Avatar alt={topic.responsible.name} src={topic.responsible.avatar} />
        )}
      </Box>
    </ListItem>
  );
};

export default TopicListItem;
