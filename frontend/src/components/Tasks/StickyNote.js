import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const StickyNote = ({ content, onDiscard, onKeep }) => {
  return (
    <Card sx={{
      width: 240,
      minHeight: 120,
      position: 'relative',
      background: '#DCD0FF', // Set the background color here
      margin: 2,
      padding: 2,
      boxSizing: 'border-box',
      '&:hover': {
        boxShadow: 6, // Increase the shadow when hovered
      },
    }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {content}
        </Typography>
        <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
          <IconButton onClick={onKeep} size="small" color="success">
            <CheckIcon />
          </IconButton>
          <IconButton onClick={onDiscard} size="small" color="error">
            <ClearIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default StickyNote;
