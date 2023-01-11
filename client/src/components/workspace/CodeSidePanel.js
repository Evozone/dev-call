import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import SettingsIcon from '@mui/icons-material/Settings';

import EditorDropdown from './EditorDropdown';
import OutputBox from './OutputBox';
import CodeInput from './CodeInput';
import OutputDetails from './OutputDetails';
import { languageOptions } from '../../utils/languageOptions';
import { defineTheme } from '../../utils/defineTheme';
import { notifyAction } from '../../actions/actions';

export default function CodeSidePanel({
    lang,
    setLang,
    theme,
    setTheme,
    codeRef,
    handleCheckboxChange,
}) {
    const dispatch = useDispatch();
    const [codeInput, setCodeInput] = useState('');
    const [outputDetails, setOutputDetails] = useState(null);
    const [processingCode, setProcessingCode] = useState(false);

    const handleLangChange = (event) => {
        const value = event.target.value;
        setLang(languageOptions.find((option) => option.value === value));
    };

    const handleThemeChange = (event) => {
        const th = event.target.value;

        if (['light', 'vs-dark'].includes(th)) {
            setTheme(th);
        } else {
            defineTheme(th).then(() => setTheme(th));
        }
    };

    const handleCodeInputChange = (event) => {
        setCodeInput(event.target.value);
    };

    const checkStatus = async (token) => {
        try {
            let res = await fetch(
                `${process.env.REACT_APP_RAPID_API_URL}/${token}?base64_encoded=true`,
                {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
                        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                    },
                }
            );
            let response = await res.json();
            let statusId = response.status?.id;
            if (statusId === 1 || statusId === 2) {
                setTimeout(() => {
                    checkStatus(token);
                }, 3500);
                return;
            } else {
                setOutputDetails(response);
                setProcessingCode(false);
                return;
            }
        } catch (err) {
            setProcessingCode(false);
            dispatch(
                notifyAction(
                    true,
                    'error',
                    `Server Error: ${err.message || err}`
                )
            );
        }
    };

    const handleCodeSubmission = async () => {
        const sourceCode = codeRef.current;
        const languageId = lang.id;
        setProcessingCode(true);

        await fetch(
            `${process.env.REACT_APP_RAPID_API_URL}?base64_encoded=true`,
            {
                method: 'POST',
                headers: {
                    'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
                    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                    'content-type': 'application/json',
                    accept: 'application/json',
                },
                body: JSON.stringify({
                    language_id: languageId,
                    source_code: btoa(sourceCode),
                    stdin: btoa(codeInput),
                }),
            }
        )
            .then(async (response) => {
                const data = await response.json();
                checkStatus(data.token);
            })
            .catch((err) => {
                setProcessingCode(false);
                const error = err.response ? err.response.data : err;
                dispatch(
                    notifyAction(
                        true,
                        'error',
                        `Server Error: ${error.message || error}`
                    )
                );
                // const status = err.response.status;
                // if (status === 429) {
                //     console.log("too many requests", status);
                //     alert('Quota of 12 requests exceeded for the Day! Please switch to a premium plan to increase your quota.');
                // }
            });
    };

    return (
        <Box
            sx={{
                p: 2,
                flex: '2 0 150px',
                display: 'flex',
                flexDirection: 'column',
                color: '#EFF6EE',
            }}
        >
            <EditorDropdown
                lang={lang}
                theme={theme}
                handleLangChange={handleLangChange}
                handleThemeChange={handleThemeChange}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                }}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={handleCheckboxChange}
                            color='success'
                            name='miniMap'
                        />
                    }
                    label='Mini Map'
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={handleCheckboxChange}
                            defaultChecked
                            color='success'
                            name='wordWrap'
                        />
                    }
                    label='Word Wrap'
                />
            </Box>
            <OutputBox outputDetails={outputDetails} />
            <CodeInput
                codeInput={codeInput}
                handleCodeInputChange={handleCodeInputChange}
            />
            <Button
                variant={processingCode ? 'disabled' : 'contained'}
                sx={{
                    bgcolor: '#25D366',
                    color: 'white',
                    width: 'fit-content',
                    alignSelf: 'end',
                    mt: 2,
                    mb: 3,
                }}
                color='success'
                startIcon={<SettingsIcon />}
                disableElevation
                onClick={handleCodeSubmission}
            >
                {processingCode ? 'Processing...' : 'Compile & Execute'}
            </Button>
            <OutputDetails outputDetails={outputDetails} />
        </Box>
    );
}
