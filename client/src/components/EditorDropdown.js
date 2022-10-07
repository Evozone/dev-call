import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import monacoThemes from 'monaco-themes/themes/themelist';

import { languageOptions } from '../constants/languageOptions';

export default function EditorDropdown({
    lang,
    theme,
    handleLangChange,
    handleThemeChange,
}) {
    return (
        <React.Fragment>
            <FormControl sx={{ mt: 1, minWidth: 120 }} size='small'>
                <InputLabel id='lang-input-id'>Language</InputLabel>
                <Select
                    labelId='lang-input-id'
                    id='lang-input-id'
                    label='Language'
                    value={lang}
                    onChange={handleLangChange}
                >
                    {languageOptions.map((language) => (
                        <MenuItem key={language.id} value={language.value}>
                            {language.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl
                sx={{ m: 0, minWidth: 120, mt: 2, mb: 2 }}
                size='small'
            >
                <InputLabel id='theme-input-id'>Theme</InputLabel>
                <Select
                    labelId='theme-input-id'
                    id='theme-input-id'
                    value={theme}
                    label='Theme'
                    onChange={handleThemeChange}
                >
                    <MenuItem value='vs-dark'>Vs-dark</MenuItem>
                    <MenuItem value='light'>Vs-light</MenuItem>
                    {Object.entries(monacoThemes).map(
                        ([themeId, themeName]) => (
                            <MenuItem key={themeId} value={themeId}>
                                {themeName}
                            </MenuItem>
                        )
                    )}
                </Select>
            </FormControl>
        </React.Fragment>
    );
}
