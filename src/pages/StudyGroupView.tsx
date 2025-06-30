import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Container,
  Chip,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Group, StudyList, Topic, Comment } from "../types";
import TopicListItem from "../components/TopicListItem";
import CreateStudyListDialog from "../components/CreateStudyListDialog";
import CreateTopicDialog from "../components/CreateTopicDialog";
import { loggedInUser } from "../data/mock";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface StudyGroupViewProps {
  group: Group;
  onBack: () => void;
}

const StudyGroupView: React.FC<StudyGroupViewProps> = ({
  group: initialGroup,
  onBack,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [group, setGroup] = useState<Group>(initialGroup);
  const [openCreateList, setOpenCreateList] = useState(false);
  const [openCreateTopic, setOpenCreateTopic] = useState(false);
  const [currentListId, setCurrentListId] = useState<string | null>(null);

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

  const handleCreateStudyList = (name: string) => {
    const newList: StudyList = {
      id: `list-${Date.now()}`,
      name,
      topics: [],
    };
    setGroup((prevGroup) => ({
      ...prevGroup,
      studyLists: [...prevGroup.studyLists, newList],
    }));
  };

  const handleOpenCreateTopicDialog = (listId: string) => {
    setCurrentListId(listId);
    setOpenCreateTopic(true);
  };

  const handleCreateTopic = (topicData: {
    title: string;
    priority: Topic["priority"];
    responsibleId?: string;
  }) => {
    const newTopic: Topic = {
      id: `topic-${Date.now()}`,
      title: topicData.title,
      priority: topicData.priority,
      status: "Não iniciado",
      comments: [],
      responsible: group.members.find((u) => u.id === topicData.responsibleId),
    };

    setGroup((prevGroup) => ({
      ...prevGroup,
      studyLists: prevGroup.studyLists.map((list) =>
        list.id === currentListId
          ? { ...list, topics: [...list.topics, newTopic] }
          : list
      ),
    }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Button onClick={onBack} sx={{ mb: 2 }}>
          &larr; Voltar para os Grupos
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
            {group.name}
          </Typography>
          <Chip
            avatar={
              <Avatar alt={group.creator.name} src={group.creator.avatar} />
            }
            label={`Criado por ${group.creator.name}`}
            variant="outlined"
          />
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="abas do grupo"
          >
            <Tab label="Listas de Estudo" />
            <Tab label="Membros" />
            <Tab label="Progresso" />
          </Tabs>
        </Box>

        <TabPanel value={tabIndex} index={0}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateList(true)}
            >
              Criar Lista de Estudo
            </Button>
          </Box>
          {group.studyLists.map((list: StudyList) => (
            <Accordion key={list.id} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography variant="h6">{list.name}</Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent Accordion from toggling
                      handleOpenCreateTopicDialog(list.id);
                    }}
                    sx={{ mr: 2 }}
                  >
                    Adicionar Tópico
                  </Button>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <Paper variant="outlined" sx={{ border: "none" }}>
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
          {group.studyLists.length === 0 && (
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              Nenhuma lista de estudo foi criada neste grupo ainda.
            </Typography>
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Typography>Gerenciamento de membros (em breve).</Typography>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Typography>Visualização de progresso (em breve).</Typography>
        </TabPanel>
      </Container>
      <CreateStudyListDialog
        open={openCreateList}
        onClose={() => setOpenCreateList(false)}
        onCreate={handleCreateStudyList}
      />
      <CreateTopicDialog
        open={openCreateTopic}
        users={group.members}
        onClose={() => setOpenCreateTopic(false)}
        onCreate={handleCreateTopic}
      />
    </>
  );
};

export default StudyGroupView;
