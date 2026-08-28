import { useState } from 'react';
import { Box, Collapse, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import type { StepSchema } from '../../engine/schema/types';
import { uswds } from '../../theme';

interface SidebarNavProps {
  steps: StepSchema[];
  currentStepId: string;
  onNavigate: (stepId: string) => void;
}

interface SectionGroup {
  section: string;
  steps: StepSchema[];
}

function groupBySection(steps: StepSchema[]): SectionGroup[] {
  const groups: SectionGroup[] = [];
  for (const step of steps) {
    const section = step.section ?? step.title;
    const existing = groups.find((g) => g.section === section);
    if (existing) existing.steps.push(step);
    else groups.push({ section, steps: [step] });
  }
  return groups;
}

export function SidebarNav({ steps, currentStepId, onNavigate }: SidebarNavProps) {
  const groups = groupBySection(steps);
  const currentIndex = steps.findIndex((s) => s.id === currentStepId);
  const currentSection = groups.find((g) => g.steps.some((s) => s.id === currentStepId))?.section;
  const [expanded, setExpanded] = useState<string | null>(currentSection ?? null);

  return (
    <Box component="nav" aria-label="Application sections" sx={{ minWidth: 240 }}>
      <List dense disablePadding>
        {groups.map((group) => {
          const isExpanded = expanded === group.section || group.section === currentSection;
          const groupHasCurrent = group.section === currentSection;
          return (
            <Box key={group.section} sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => setExpanded(isExpanded && !groupHasCurrent ? null : group.section)}
                sx={{ py: 0.75 }}
              >
                <ListItemText
                  primary={group.section}
                  slotProps={{ primary: { sx: { fontWeight: 700, fontSize: '0.95rem', color: uswds.inkDarkest } } }}
                />
                {isExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
              </ListItemButton>
              <Collapse in={isExpanded} timeout="auto">
                <List dense disablePadding>
                  {group.steps.map((step) => {
                    const stepIndex = steps.findIndex((s) => s.id === step.id);
                    const isCurrent = step.id === currentStepId;
                    const isReachable = stepIndex <= currentIndex;
                    return (
                      <ListItemButton
                        key={step.id}
                        disabled={!isReachable}
                        onClick={() => onNavigate(step.id)}
                        sx={{
                          py: 0.75,
                          pl: 3,
                          borderLeft: isCurrent ? `4px solid ${uswds.primary}` : '4px solid transparent',
                          bgcolor: isCurrent ? uswds.primaryLighter : 'transparent',
                        }}
                      >
                        <ListItemText
                          primary={step.title}
                          slotProps={{
                            primary: {
                              sx: {
                                fontWeight: isCurrent ? 700 : 400,
                                fontSize: '0.9rem',
                                color: isReachable ? uswds.inkDarker : uswds.baseLight,
                              },
                            },
                          }}
                        />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </Box>
          );
        })}
      </List>
      <Typography variant="caption" sx={{ display: 'block', color: uswds.base, mt: 2, px: 2 }}>
        You can return to any step you&apos;ve already completed.
      </Typography>
    </Box>
  );
}
