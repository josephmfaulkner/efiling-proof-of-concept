import { Box, List, ListItem, Typography } from '@mui/material';
import type { ContentBlock } from '../../engine/schema/types';
import { uswds } from '../../theme';

/** Renders a step's read-only `content` blocks — the generic mechanism behind every form's "Before You Start" / "Filling Out Your Form Online" intro pages. */
export function StepContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <Box sx={{ mb: 3 }}>
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          const variant = block.level === 4 ? 'h4' : block.level === 3 ? 'h3' : 'h2';
          return (
            <Typography key={i} variant={variant} sx={{ fontSize: block.level === 4 ? '1.05rem' : undefined, mt: i === 0 ? 0 : 3, mb: 1.5 }}>
              {block.text}
            </Typography>
          );
        }
        if (block.type === 'list') {
          return (
            <List key={i} dense sx={{ listStyleType: 'disc', pl: 3, py: 0 }}>
              {block.items.map((item) => (
                <ListItem key={item} sx={{ display: 'list-item', p: 0, mb: 0.5 }}>
                  <Typography variant="body2" sx={{ color: uswds.inkDarker }}>
                    {item}
                  </Typography>
                </ListItem>
              ))}
            </List>
          );
        }
        return (
          <Typography key={i} variant="body2" sx={{ color: uswds.inkDarker, mb: 1.5 }}>
            {block.text}
          </Typography>
        );
      })}
    </Box>
  );
}
