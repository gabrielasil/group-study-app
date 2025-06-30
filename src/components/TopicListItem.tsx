import React, { useState } from "react";
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
  IconButton,
  Card,
  Modal,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { Topic, User, TopicStatus } from "../types";
import { loggedInUser } from "../data/mock";

interface TopicListItemProps {
  topic: Topic;
  users: User[];
  onUpdateTopic: (updatedTopic: Topic) => void;
  onAddComment: (topicId: string, commentText: string) => void;
}

const statusColors: { [key in TopicStatus]: "error" | "warning" | "success" } =
  {
    "Não iniciado": "error",
    "Em revisão": "warning",
    Estudado: "success",
  };

const priorityColors: {
  [key in Topic["priority"]]: "error" | "warning" | "info";
} = {
  Alta: "error",
  Média: "warning",
  Baixa: "info",
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
  maxHeight: "80vh",
  overflow: "auto",
};

const TopicListItem: React.FC<TopicListItemProps> = ({
  topic,
  users,
  onUpdateTopic,
  onAddComment,
}) => {
  const [commentsOpen, setCommentsOpen] = useState(false);

  const handleStatusChange = (event: SelectChangeEvent) => {
    onUpdateTopic({ ...topic, status: event.target.value as TopicStatus });
  };

  const handleResponsibleChange = (event: SelectChangeEvent) => {
    const responsible = users.find((u) => u.id === event.target.value);
    onUpdateTopic({ ...topic, responsible });
  };

  // Adapt our data to the library's format
  const commentData = topic.comments.map((c) => ({
    userId: c.author.id,
    comId: c.id,
    fullName: c.author.name,
    text: c.text,
    avatarUrl: c.author.avatar,
    replies: [],
  }));

  return (
    <>
      <Card sx={{ mb: 1, p: 1 }}>
        <ListItem>
          <ListItemText
            primary={topic.title}
            secondary={
              <Chip
                label={topic.priority}
                color={priorityColors[topic.priority]}
                size="small"
                sx={{ mt: 1 }}
              />
            }
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
              renderValue={(selected) => {
                if (!selected) return <em>Não atribuído</em>;
                const user = users.find((u) => u.id === selected);
                return (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={user?.avatar}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    {user?.name}
                  </Box>
                );
              }}
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
            <IconButton onClick={() => setCommentsOpen(true)}>
              <CommentIcon />
            </IconButton>
          </Box>
        </ListItem>
      </Card>

      <Modal open={commentsOpen} onClose={() => setCommentsOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Comentários em "{topic.title}"
          </Typography>
          <CommentSection
            currentUser={{
              currentUserId: loggedInUser.id,
              currentUserImg: loggedInUser.avatar,
              currentUserFullName: loggedInUser.name,
              currentUserProfile: "#",
            }}
            logIn={{ loginLink: "#", signUpLink: "#" }}
            commentData={commentData}
            onSubmitAction={(data: { text: string }) => {
              onAddComment(topic.id, data.text);
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default TopicListItem;
