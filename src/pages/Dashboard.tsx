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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { mockGroups, loggedInUser } from "../data/mock";
import { Group } from "../types";
import StudyGroupView from "./StudyGroupView";
import CreateGroupDialog from "../components/CreateGroupDialog";

const Dashboard = () => {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  const handleCreateGroup = (newGroupData: {
    name: string;
    description: string;
  }) => {
    const newGroup: Group = {
      id: `group-${Date.now()}`,
      name: newGroupData.name,
      creator: loggedInUser,
      members: [loggedInUser],
      studyLists: [],
    };
    setGroups((prevGroups) => [newGroup, ...prevGroups]);
    setOpenCreateGroup(false);
  };

  if (selectedGroup) {
    return (
      <StudyGroupView
        group={selectedGroup}
        onBack={() => setSelectedGroup(null)}
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
          <Button variant="outlined">Entrar em um Grupo</Button>
        </Box>

        <Grid container spacing={3}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={group.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
    </>
  );
};

export default Dashboard;
