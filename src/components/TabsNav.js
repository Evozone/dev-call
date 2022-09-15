import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
// import CloseIcon from '@mui/icons-material/Close';

const data = [
    {
        username: 'thebrahmnicboy',
        id: '1',
    },
    {
        username: 'thebrahmnicboy',
        id: '2',
    },
    {
        username: 'thebrahmnicboy',
        id: '3',
    },
    {
        username: 'thebrahmnicboy',
        id: '4',
    },
];

function TabPanel(props) {
    const { item, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0 }}>
                    <ListItem sx={{ p: 0 }}>
                        <ListItemButton sx={{ px: 2, height: '70px' }}>
                            <Avatar sx={{ width: 50, height: 50, mr: 2 }}>
                                {item.username.charAt(0)}
                            </Avatar>
                            <Typography sx={{ mb: 3, fontSize: '18px' }}>
                                {item.username}
                            </Typography>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function TabsNav({ mode }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
            <AppBar elevation={0} color='inherit' position='static'>
                <Tabs
                    sx={{ height: '75px', alignItems: 'center' }}
                    value={value}
                    onChange={handleChange}
                    textColor='inherit'
                    variant='fullWidth'
                    aria-label='full width tabs example'
                >
                    <Tab
                        sx={{
                            height: '75px',
                            fontSize: '1.1rem',
                            ...(mode === 'dark'
                                ? {
                                      borderRight:
                                          '1px solid rgba(255, 255, 255, 0.12)',
                                      borderBottom:
                                          '1px solid rgba(255, 255, 255, 0.12)',
                                  }
                                : {
                                      borderRight:
                                          '1px solid rgba(0, 0, 0, 0.12)',
                                      borderBottom:
                                          '1px solid rgba(0, 0, 0, 0.12)',
                                  }),
                        }}
                        label='CHATS'
                        {...a11yProps(0)}
                    />
                    <Tab
                        sx={{
                            height: '75px',
                            fontSize: '1.1rem',
                            ...(mode === 'dark'
                                ? {
                                      borderBottom:
                                          '1px solid rgba(255, 255, 255, 0.12)',
                                  }
                                : {
                                      borderBottom:
                                          '1px solid rgba(0, 0, 0, 0.12)',
                                  }),
                        }}
                        label='SEARCH'
                        {...a11yProps(1)}
                    />
                </Tabs>
            </AppBar>
            <List sx={{ p: 0 }}>
                {data.map((item) => {
                    return (
                        <TabPanel
                            item={item}
                            value={value}
                            index={0}
                            key={item.id}
                        />
                    );
                })}
            </List>
            <List sx={{ p: 0 }}>
                {value === 1 && (
                    <TextField
                        label='username'
                        sx={{
                            m: 2,
                            width: '93%',
                            '& .MuiOutlinedInput-root': {
                                paddingRight: '6px',
                                borderRadius: '20px',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        size='small'
                    />
                )}
                <Divider />
                {data.map((item) => {
                    return (
                        <TabPanel
                            item={item}
                            value={value}
                            index={1}
                            key={item.id}
                        />
                    );
                })}
            </List>
        </Box>
    );
}
