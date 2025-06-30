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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { mockGroups, loggedInUser } from "../data/mock";
import { Group } from "../types";
import StudyGroupView from "./StudyGroupView";
import CreateGroupDialog from "../components/CreateGroupDialog";

const Dashboard = () => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [openCreateGroup, setOpenCreateGroup] = useState(false);

  const handleCreateGroup = (newGroup: {
    name: string;
    description: string;
  }) => {
    // Mock creating group
    console.log("New Group:", newGroup);
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
          {mockGroups.map((group) => (
            <Grid item xs={12} md={6} lg={4} key={group.id}>
              <Card>
                <CardActionArea onClick={() => setSelectedGroup(group)}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {group.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
