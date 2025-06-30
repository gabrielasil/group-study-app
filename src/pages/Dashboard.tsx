import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { mockGroups, loggedInUser } from "../data/mock";
import { Group } from "../types";
import StudyGroupView from "./StudyGroupView";
import CreateGroupDialog from "../components/CreateGroupDialog";
import JoinGroupDialog from "../components/JoinGroupDialog";

const Dashboard = () => {
  // Hide a group the user is not a member of for the demonstration.
  const groupsToHide = ["DESIGNP202"];
  const [groups, setGroups] = useState<Group[]>(
    mockGroups.filter(
      (g) =>
        !groupsToHide.includes(g.code) ||
        g.members.some((m) => m.id === loggedInUser.id)
    )
  );
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);
  const [openJoinGroup, setOpenJoinGroup] = useState(false);

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

  const handleCreateGroup = (newGroupData: {
    name: string;
    description: string;
  }) => {
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name: newGroupData.name,
      code: Math.random().toString(36).substring(2, 8).toUpperCase(),
      creator: loggedInUser,
      members: [loggedInUser],
      studyLists: [],
    };
    setGroups((prevGroups) => [newGroup, ...prevGroups]);
    setOpenCreateGroup(false);
  };

  const handleJoinGroup = (code: string) => {
    // Look in the original mockGroups array to find the hidden group
    const groupToJoin = mockGroups.find((g) => g.code === code);
    if (!groupToJoin) {
      alert("Código de grupo inválido!");
      return;
    }

    const isAlreadyVisible = groups.some((g) => g.id === groupToJoin.id);
    if (isAlreadyVisible) {
      alert("Você já é membro deste grupo!");
      return;
    }

    // In a real app, this would be an API call to add the user.
    // For this mock, we just add the group to the dashboard.
    setGroups((prevGroups) => [...prevGroups, groupToJoin]);
    alert(`Você entrou no grupo: ${groupToJoin.name}!`);
  };

  const handleLeaveGroup = (groupId: string) => {
    // In a real app, this would be an API call.
    // Here we just remove the group from the user's list.
    setGroups((prevGroups) => prevGroups.filter((g) => g.id !== groupId));
    setSelectedGroup(null); // Go back to the dashboard
  };

  if (selectedGroup) {
    return (
      <StudyGroupView
        group={selectedGroup}
        onBack={() => setSelectedGroup(null)}
        onLeaveGroup={handleLeaveGroup}
      />
    );
  }

  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Bem-vindo, {loggedInUser.name}!
          </Typography>
          <Typography color="text.secondary">
            Acompanhe seus grupos de estudo ou crie um novo.
          </Typography>
        </Box>

        <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateGroup(true)}
          >
            Criar Grupo
          </Button>
          <Button variant="outlined" onClick={() => setOpenJoinGroup(true)}>
            Entrar em um Grupo
          </Button>
        </Box>

        <Grid container spacing={3}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={group.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  "&:hover .copy-button": { opacity: 1 },
                }}
              >
                <Tooltip title="Copiar código">
                  <IconButton
                    className="copy-button"
                    size="small"
                    onClick={() => handleCopyToClipboard(group.code)}
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      zIndex: 2, // Ensure button is on top
                      opacity: 0,
                      transition: "opacity 0.2s",
                    }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <CardActionArea
                  onClick={() => setSelectedGroup(group)}
                  sx={{ flexGrow: 1 }}
                >
                  <CardContent>
                    <Tooltip title={group.name} placement="top">
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {group.name}
                      </Typography>
                    </Tooltip>
                    <Typography
                      sx={{ mt: 1.5, mb: 1.5 }}
                      color="text.secondary"
                    >
                      {group.members.length} membros
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <CreateGroupDialog
        open={openCreateGroup}
        onClose={() => setOpenCreateGroup(false)}
        onCreate={handleCreateGroup}
      />
      <JoinGroupDialog
        open={openJoinGroup}
        onClose={() => setOpenJoinGroup(false)}
        onJoin={handleJoinGroup}
      />
    </>
  );
};

export default Dashboard;
