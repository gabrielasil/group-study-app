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
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Group, StudyList, Topic, Comment, User, StudyEvent } from "../types";
import TopicListItem from "../components/TopicListItem";
import CreateStudyListDialog from "../components/CreateStudyListDialog";
import CreateTopicDialog from "../components/CreateTopicDialog";
import LeaveGroupDialog from "../components/LeaveGroupDialog";
import CreateEventDialog from "../components/CreateEventDialog";
import ConfirmationDialog from "../components/ConfirmationDialog";
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
  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean;
    type: "topic" | "event" | null;
    id: string | null;
  }>({ open: false, type: null, id: null });

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

  const handleDeleteTopic = (topicId: string) => {
    setDeleteConfirmation({ open: true, type: "topic", id: topicId });
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

  const handleCreateEvent = (eventData: {
    name: string;
    location: string;
    dateTime: Date;
  }) => {
    const newEvent: StudyEvent = {
      id: `event-${Date.now()}`,
      creator: loggedInUser,
      ...eventData,
    };
    setGroup((prevGroup) => ({
      ...prevGroup,
      events: [...prevGroup.events, newEvent].sort(
        (a, b) => a.dateTime.getTime() - b.dateTime.getTime()
      ),
    }));
  };

  const handleDeleteEvent = (eventId: string) => {
    setDeleteConfirmation({ open: true, type: "event", id: eventId });
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirmation.id || !deleteConfirmation.type) return;

    if (deleteConfirmation.type === "topic") {
      const updatedLists = group.studyLists.map((list) => ({
        ...list,
        topics: list.topics.filter((t) => t.id !== deleteConfirmation.id),
      }));
      setGroup({ ...group, studyLists: updatedLists });
    } else if (deleteConfirmation.type === "event") {
      setGroup((prevGroup) => ({
        ...prevGroup,
        events: prevGroup.events.filter((e) => e.id !== deleteConfirmation.id),
      }));
    }

    // Close the dialog
    setDeleteConfirmation({ open: false, type: null, id: null });
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
            <Tab label="Eventos" />
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
                      groupCreator={group.creator}
                      onUpdateTopic={handleUpdateTopic}
                      onAddComment={handleAddComment}
                      onDeleteTopic={handleDeleteTopic}
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenCreateEvent(true)}
            >
              Criar Evento
            </Button>
          </Box>
          <List>
            {group.events.map((event) => {
              const isPast = event.dateTime.getTime() < new Date().getTime();
              return (
                <Card
                  key={event.id}
                  variant="outlined"
                  sx={{ mb: 2, opacity: isPast ? 0.6 : 1 }}
                >
                  <CardContent>
                    <Typography variant="h6">{event.name}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "text.secondary",
                        mt: 1,
                        mb: 1,
                      }}
                    >
                      <EventIcon sx={{ mr: 1 }} fontSize="small" />
                      <Typography variant="body2">
                        {new Date(event.dateTime).toLocaleString("pt-BR", {
                          dateStyle: "full",
                          timeStyle: "short",
                        })}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "text.secondary",
                      }}
                    >
                      <LocationOnIcon sx={{ mr: 1 }} fontSize="small" />
                      <Typography variant="body2">{event.location}</Typography>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: "space-between" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        pl: 1,
                      }}
                    >
                      <Avatar
                        src={getAvatarUrl(event.creator)}
                        sx={{ width: 24, height: 24, mr: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Criado por {event.creator.name}
                      </Typography>
                    </Box>
                    {loggedInUser.id === group.creator.id && (
                      <Tooltip
                        title={
                          isPast
                            ? "Não é possível apagar eventos passados"
                            : "Apagar evento"
                        }
                      >
                        <span>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteEvent(event.id)}
                            disabled={isPast}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                  </CardActions>
                </Card>
              );
            })}
          </List>
          {group.events.length === 0 && (
            <Typography sx={{ p: 2, color: "text.secondary" }}>
              Nenhum evento agendado para este grupo ainda.
            </Typography>
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
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
      <CreateEventDialog
        open={openCreateEvent}
        onClose={() => setOpenCreateEvent(false)}
        onCreate={handleCreateEvent}
      />
      <ConfirmationDialog
        open={deleteConfirmation.open}
        onClose={() =>
          setDeleteConfirmation({ open: false, type: null, id: null })
        }
        onConfirm={handleConfirmDelete}
        title={`Confirmar Exclusão de ${
          deleteConfirmation.type === "topic" ? "Tópico" : "Evento"
        }`}
        message={`Você tem certeza que deseja excluir este ${
          deleteConfirmation.type === "topic" ? "tópico" : "evento"
        }? Esta ação não pode ser desfeita.`}
      />
    </>
  );
};

export default StudyGroupView;
