import React from "react";
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
import { Group, StudyList } from "../types";
import TopicListItem from "../components/TopicListItem";

interface StudyGroupViewProps {
  group: Group;
  onBack: () => void;
}

const StudyGroupView: React.FC<StudyGroupViewProps> = ({ group, onBack }) => {
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
                    onUpdateTopic={() => {
                      // Mock update function
                    }}
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
