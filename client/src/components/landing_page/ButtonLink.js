import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ButtonLink({ href, text }) {
    return (
        <Button
            variant='contained'
            href={href}
            target='_blank'
            sx={{
                backgroundColor: '#314469',
                color: '#f5f5f5',
                margin: '1rem',
                '&:hover': {
                    backgroundColor: '#49659C',
                },
                textTransform: 'none',
            }}
        >
            <Typography
                variant='h6'
                component='div'
                sx={{ fontFamily: 'Work Sans', fontWeight: '400' }}
            >
                {text}
            </Typography>
        </Button>
    );
}
