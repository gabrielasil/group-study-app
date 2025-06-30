import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import { mockGroups } from "../data/mock";
import { Group } from "../types";
import StudyGroupView from "./StudyGroupView";

const Dashboard = () => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  if (selectedGroup) {
    return (
      <StudyGroupView
        group={selectedGroup}
        onBack={() => setSelectedGroup(null)}
      />
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Meus Grupos de Estudo
      </Typography>
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
  );
};

export default Dashboard;
