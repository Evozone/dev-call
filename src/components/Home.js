import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import TabsNav from './TabsNav';

const drawerWidth = 470;

export default function Home({ themeChange, mode }) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: 'none',
                    },
                }}
                variant='permanent'
                anchor='left'
            >
                <Box
                    sx={{
                        height: '75px',
                        display: 'flex',
                        alignItems: 'center',
                        pl: 2,
                        backgroundColor: 'info.main',
                        // edit the below @bhargav
                        borderRight: '5px solid red',
                    }}
                >
                    <Avatar sx={{ width: 50, height: 50, mr: 2 }}>i</Avatar>
                    <Typography sx={{ color: 'white' }} variant='h5'>
                        itsvishal2417
                    </Typography>
                    <Grid pr='10px' container justifyContent='flex-end'>
                        <Tooltip title='Toggle Theme'>
                            <IconButton
                                onClick={themeChange}
                                sx={{ mr: '10px' }}
                            >
                                {mode === 'dark' ? (
                                    <LightModeIcon />
                                ) : (
                                    <DarkModeIcon sx={{ color: 'white' }} />
                                )}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Install'>
                            <IconButton sx={{ mr: '10px' }}>
                                <DownloadIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Logout'>
                            <IconButton>
                                <LogoutIcon color='error' />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        height: 'calc(100% - 75px)',
                        ...(mode === 'dark'
                            ? {
                                  borderRight:
                                      '1px solid rgba(255, 255, 255, 0.12)',
                              }
                            : { borderRight: '1px solid rgba(0, 0, 0, 0.12)' }),
                    }}
                >
                    <TabsNav mode={mode} />
                </Box>
            </Drawer>
            <Box
                component='main'
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 0 }}
            >
                <Toolbar
                    sx={{
                        height: '75px',
                        backgroundColor: 'info.main',
                    }}
                />
                <Box sx={{ p: 3 }}>
                    <Typography paragraph>Testing some changes</Typography>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit.
                        Fringilla est ullamcorper eget nulla facilisi etiam
                        dignissim diam. Pulvinar elementum integer enim neque
                        volutpat ac tincidunt. Ornare suspendisse sed nisi lacus
                        sed viverra tellus. Purus sit amet volutpat consequat
                        mauris. Elementum eu facilisis sed odio morbi. Euismod
                        lacinia at quis risus sed vulputate odio. Morbi
                        tincidunt ornare massa eget egestas purus viverra
                        accumsan in. In hendrerit gravida rutrum quisque non
                        tellus orci ac. Pellentesque nec nam aliquam sem et
                        tortor. Habitant morbi tristique senectus et. Adipiscing
                        elit duis tristique sollicitudin nibh sit. Ornare aenean
                        euismod elementum nisi quis eleifend. Commodo viverra
                        maecenas accumsan lacus vel facilisis. Nulla posuere
                        sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
