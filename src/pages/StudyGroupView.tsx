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
  Tooltip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Group, StudyList, Topic, Comment, User } from "../types";
import TopicListItem from "../components/TopicListItem";
import CreateStudyListDialog from "../components/CreateStudyListDialog";
import CreateTopicDialog from "../components/CreateTopicDialog";
import LeaveGroupDialog from "../components/LeaveGroupDialog";
import { loggedInUser } from "../data/mock";
import { getAvatarUrl } from "../utils/avatar";

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
  onLeaveGroup: (groupId: string) => void;
}

const StudyGroupView: React.FC<StudyGroupViewProps> = ({
  group: initialGroup,
  onBack,
  onLeaveGroup,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [group, setGroup] = useState<Group>(initialGroup);
  const [openCreateList, setOpenCreateList] = useState(false);
  const [openCreateTopic, setOpenCreateTopic] = useState(false);
  const [currentListId, setCurrentListId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLeaveDialog = () => {
    setLeaveDialogOpen(true);
    handleMenuClose();
  };

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

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert(`Código "${text}" copiado para a área de transferência!`);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        alert("Não foi possível copiar o código.");
      }
    );
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Chip
              avatar={
                <Avatar
                  alt={group.creator.name}
                  src={getAvatarUrl(group.creator)}
                />
              }
              label={`Criado por ${group.creator.name}`}
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <Tooltip title="Copiar código do grupo">
              <Chip
                icon={<ContentCopyIcon />}
                label={group.code}
                variant="outlined"
                onClick={() => handleCopyToClipboard(group.code)}
                sx={{ mr: 1 }}
              />
            </Tooltip>
            <Tooltip title="Mais opções">
              <IconButton
                aria-label="mais opções"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleOpenLeaveDialog}>
                <ExitToAppIcon sx={{ mr: 1 }} />
                Sair do Grupo
              </MenuItem>
            </Menu>
          </Box>
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
          <Paper>
            <List>
              {group.members.map((member: User) => (
                <ListItem key={member.id}>
                  <ListItemAvatar>
                    <Avatar src={getAvatarUrl(member)} />
                  </ListItemAvatar>
                  <ListItemText primary={member.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
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
      <LeaveGroupDialog
        open={leaveDialogOpen}
        onClose={() => setLeaveDialogOpen(false)}
        onConfirm={() => onLeaveGroup(group.id)}
        groupName={group.name}
      />
    </>
  );
};

export default StudyGroupView;
