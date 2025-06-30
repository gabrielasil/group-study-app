import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Group, StudyList, Topic, Comment } from "../types";
import TopicListItem from "../components/TopicListItem";
import { loggedInUser } from "../data/mock";

interface StudyGroupViewProps {
  group: Group;
  onBack: () => void;
}

const StudyGroupView: React.FC<StudyGroupViewProps> = ({
  group: initialGroup,
  onBack,
}) => {
  const [group, setGroup] = useState<Group>(initialGroup);

  useEffect(() => {
    setGroup(initialGroup);
  }, [initialGroup]);

  const handleUpdateTopic = (updatedTopic: Topic) => {
    const updatedLists = group.studyLists.map((list) => ({
      ...list,
      topics: list.topics.map((t) =>
        t.id === updatedTopic.id ? updatedTopic : t
      ),
    }));
    setGroup({ ...group, studyLists: updatedLists });
  };

  const handleAddComment = (topicId: string, commentText: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: loggedInUser,
      text: commentText,
      createdAt: new Date().toISOString(),
    };

    const updatedLists = group.studyLists.map((list) => ({
      ...list,
      topics: list.topics.map((t) =>
        t.id === topicId ? { ...t, comments: [...t.comments, newComment] } : t
      ),
    }));
    setGroup({ ...group, studyLists: updatedLists });
  };

  return (
    <Box>
      <Button onClick={onBack} sx={{ mb: 2 }}>
        &larr; Voltar para os Grupos
      </Button>
      <Typography variant="h4" gutterBottom>
        {group.name}
      </Typography>

      <Box mt={4}>
        {group.studyLists.map((list: StudyList) => (
          <Accordion key={list.id} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{list.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper variant="outlined">
                {list.topics.map((topic) => (
                  <TopicListItem
                    key={topic.id}
                    topic={topic}
                    users={group.members}
                    onUpdateTopic={handleUpdateTopic}
                    onAddComment={handleAddComment}
                  />
                ))}
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default StudyGroupView;
