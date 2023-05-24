import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton } from '@mui/material';

const MarkComponent = (props) => {
  const language = props.className;
  console.log(language?.replace('language-', ''));
  return (
    <Box sx={{
      position: 'relative',
      backgroundColor: '#2d2d2d',
      paddingRight: '1.1rem',
      borderRadius: '10px',
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
    }}>
      <IconButton
        sx={{
          position: 'absolute',
          right: '0',
          zIndex: '1',
          '&:hover': {
            color: '#ffffff66',
          }
        }}
        aria-label="copy"
        onClick={() => navigator.clipboard.writeText(props.children)}
      >
        <ContentCopyIcon fontSize='small' />
      </IconButton>
      <SyntaxHighlighter
        language={language ? language.replace('language-', '') : null}
        style={a11yDark}
        showLineNumbers={true}
        wrapLines={true}
      >
        {props.children}
      </SyntaxHighlighter >
    </Box>
  )
}

export default MarkComponent;