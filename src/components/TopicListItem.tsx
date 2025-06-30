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
  FormControl,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { Topic, User, TopicStatus, Comment } from "../types";
import { loggedInUser } from "../data/mock";
import { getAvatarUrl } from "../utils/avatar";

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
  display: "flex",
  flexDirection: "column",
  overflow: "visible",
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
  const commentData = topic.comments.map((c: Comment) => ({
    userId: c.author.id,
    comId: c.id,
    fullName: c.author.name,
    text: c.text,
    avatarUrl: getAvatarUrl(c.author),
    replies: [],
  }));

  return (
    <>
      <Card variant="outlined" sx={{ mb: 1, p: 1, borderRadius: 2 }}>
        <ListItem
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <FormControl sx={{ m: 1, minWidth: 140 }}>
              <Select
                value={topic.status}
                onChange={handleStatusChange}
                variant="outlined"
                size="small"
              >
                <MenuItem value="Não iniciado">Não iniciado</MenuItem>
                <MenuItem value="Em revisão">Em revisão</MenuItem>
                <MenuItem value="Estudado">Estudado</MenuItem>
              </Select>
            </FormControl>

            <Chip
              label={topic.status}
              color={statusColors[topic.status]}
              sx={{ width: 110 }}
            />

            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <Select
                value={topic.responsible?.id || ""}
                onChange={handleResponsibleChange}
                displayEmpty
                variant="outlined"
                size="small"
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography color="text.secondary" sx={{ ml: 1 }}>
                        Não atribuído
                      </Typography>
                    );
                  }
                  const user = users.find((u) => u.id === selected);
                  return (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={user ? getAvatarUrl(user) : ""}
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      {user?.name}
                    </Box>
                  );
                }}
              >
                <MenuItem value="">
                  <Typography color="text.secondary">Não atribuído</Typography>
                </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    <Avatar
                      src={getAvatarUrl(user)}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography>{user.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton onClick={() => setCommentsOpen(true)}>
              <CommentIcon />
            </IconButton>
          </Box>
        </ListItem>
      </Card>

      <Modal open={commentsOpen} onClose={() => setCommentsOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2, flexShrink: 0 }}>
            Comentários em "{topic.title}"
          </Typography>
          <Box sx={{ overflow: "auto" }}>
            <CommentSection
              currentUser={{
                currentUserId: loggedInUser.id,
                currentUserImg: getAvatarUrl(loggedInUser),
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
        </Box>
      </Modal>
    </>
  );
};

export default TopicListItem;
