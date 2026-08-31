import { useState } from 'react';
import { Box, Collapse, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import type { StepSchema } from '../../engine/schema/types';
import { uswds } from '../../theme';

interface SidebarNavProps {
  steps: StepSchema[];
  currentStepId: string;
  /** From the wizard's live context.visibleSteps — every step without a visibleWhen is always in here. */
  visibleSteps: Set<string>;
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

/**
 * Matches the real myUSCIS sidebar's actual MUI Accordion styling: bold
 * section headers colored primary-dark, primary-darker plus a left border
 * when expanded, and *no* background highlight anywhere — current step is
 * distinguished by bold text and color alone, same as real leaf nav links.
 */
export function SidebarNav({ steps, currentStepId, visibleSteps, onNavigate }: SidebarNavProps) {
  const groups = groupBySection(steps);
  const currentSection = groups.find((g) => g.steps.some((s) => s.id === currentStepId))?.section;
  const [expanded, setExpanded] = useState<string | null>(currentSection ?? null);

  return (
    <Box component="nav" aria-label="Application sections" sx={{ minWidth: 240 }}>
      <List dense disablePadding>
        {groups.map((group) => {
          const isExpanded = expanded === group.section || group.section === currentSection;
          const groupHasCurrent = group.section === currentSection;
          return (
            <Box
              key={group.section}
              sx={{ borderLeft: isExpanded ? `4px solid ${uswds.primaryDarker}` : '4px solid transparent' }}
            >
              <ListItemButton
                onClick={() => setExpanded(isExpanded && !groupHasCurrent ? null : group.section)}
                sx={{ py: 0.75, px: 1.5 }}
              >
                <ListItemText
                  primary={group.section}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: isExpanded ? uswds.primaryDarker : uswds.primaryDark,
                      },
                    },
                  }}
                />
                {isExpanded ? (
                  <ExpandLessIcon fontSize="small" sx={{ color: uswds.primaryDark }} />
                ) : (
                  <ExpandMoreIcon fontSize="small" sx={{ color: uswds.primaryDark }} />
                )}
              </ListItemButton>
              <Collapse in={isExpanded} timeout="auto">
                <List dense disablePadding>
                  {group.steps.map((step) => {
                    const isCurrent = step.id === currentStepId;
                    const isReachable = visibleSteps.has(step.id);
                    return (
                      <ListItemButton key={step.id} disabled={!isReachable} onClick={() => onNavigate(step.id)} sx={{ py: 0.5, pl: 3 }}>
                        <ListItemText
                          primary={step.title}
                          slotProps={{
                            primary: {
                              sx: {
                                fontWeight: isCurrent ? 700 : 400,
                                fontSize: '0.95rem',
                                color: !isReachable ? uswds.baseLight : isCurrent ? uswds.primaryDarker : uswds.primaryDark,
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
        You can navigate to any available section, in any order. Fill in every required field before generating your PDF.
      </Typography>
    </Box>
  );
}
